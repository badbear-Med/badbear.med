import json
import os
import time
import urllib.error
import urllib.request

DOMAIN = "wajomea.group"
WORKER = "badbear-campus-gateway"
CAMPUS = "/badbear-campus/index.html"
MED = "/app.html?page=badbear-med.html%3F_ui%3D20261011-clean-navigation2"


def cloudflare(path, method="GET", payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    request = urllib.request.Request(
        "https://api.cloudflare.com/client/v4" + path, data=data, method=method,
        headers={"Authorization": "Bearer " + os.environ["CF_ZONE_TOKEN"],
                 "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        codes = [item.get("code") for item in json.load(error).get("errors", [])]
        raise RuntimeError(f"Cloudflare {method}: HTTP {error.code}, codes {codes}") from None
    if not result.get("success"):
        raise RuntimeError(f"Cloudflare rejected {method}")
    return result["result"]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def check():
    client = urllib.request.build_opener(NoRedirect)
    try:
        with client.open("https://" + DOMAIN + MED, timeout=10):
            return False
    except urllib.error.HTTPError as error:
        if error.code != 303 or error.headers.get("Location") != CAMPUS:
            return False
    with client.open("https://" + DOMAIN + CAMPUS, timeout=10) as response:
        return response.status == 200 and b'campus-gateway' in response.read()


def main():
    if not os.environ.get("CF_ZONE_TOKEN"):
        raise RuntimeError("Missing CLOUDFLARE_ZONE_API_TOKEN")
    zones = cloudflare("/zones?name=" + DOMAIN)
    if len(zones) != 1 or zones[0]["name"] != DOMAIN:
        raise RuntimeError("Could not identify wajomea.group")
    zone = "/zones/" + zones[0]["id"]
    dns = zone + "/dns_records"
    routes = zone + "/workers/routes"
    hosts = [DOMAIN, "www." + DOMAIN]
    patterns = [host + "/*" for host in hosts]
    existing = {route["pattern"]: route for route in cloudflare(routes)}
    for pattern in patterns:
        if pattern in existing and existing[pattern].get("script") != WORKER:
            raise RuntimeError(f"Conflicting Worker route: {pattern}")
    records = []
    for host in hosts:
        group = [r for r in cloudflare(dns + "?name=" + host)
                 if r["name"] == host and r["type"] in {"A", "AAAA", "CNAME"}]
        if not group or any(not r.get("proxiable") for r in group):
            raise RuntimeError(f"Could not identify proxy-capable DNS records for {host}")
        records.extend(group)

    added, changed = [], []
    try:
        for pattern in patterns:
            if pattern not in existing:
                route = cloudflare(routes, "POST", {"pattern": pattern, "script": WORKER})
                added.append(route["id"])
        for record in records:
            if not record["proxied"]:
                cloudflare(dns + "/" + record["id"], "PATCH", {"proxied": True})
                changed.append(record["id"])
        for attempt in range(8):
            try:
                if check():
                    print("BADBEAR.MED redirects to the official Campus without a session.")
                    return
            except OSError:
                pass
            time.sleep(10)
        raise RuntimeError("Public smoke test did not pass")
    except Exception:
        for collection, ids, method, payload in [
            (dns, reversed(changed), "PATCH", {"proxied": False}),
            (routes, reversed(added), "DELETE", None),
        ]:
            for identifier in ids:
                try:
                    cloudflare(collection + "/" + identifier, method, payload)
                except Exception as error:
                    print(f"Rollback failed for {collection}: {error}", flush=True)
        raise


if __name__ == "__main__":
    main()
