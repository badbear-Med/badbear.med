# Atribución del modelo 3D

El módulo **BADBEAR.MED · Anatomía 3D** utiliza el modelo abierto **Écorché** para visualización educativa.

## Modelo

**Écorché**  
Repositorio: https://github.com/Charleeh/ecorche  
Licencia del modelo y derivados: **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

Línea de crédito recomendada por el proyecto:

> Écorché (github.com/Charleeh/ecorche), CC BY-SA 4.0. Based on BodyParts3D, © The Database Center for Life Science, CC BY 4.0, and Z-Anatomy by Gauthier Kervyn, CC BY-SA 4.0.

El modelo integra geometría procedente de:

- **BodyParts3D**, © The Database Center for Life Science, licencia CC BY 4.0.
- **Z-Anatomy**, Gauthier Kervyn, licencia CC BY-SA 4.0.

## Código del visor BADBEAR.MED

La interfaz y lógica de este módulo fueron implementadas específicamente para BADBEAR.MED utilizando Three.js como motor de renderizado web.

## Uso

Este atlas es un recurso educativo. No es un dispositivo médico ni está destinado a planificación diagnóstica, terapéutica o quirúrgica.


## Cerebro 3D

El módulo de **Sistema nervioso / Cerebro 3D** utiliza el activo neuroanatómico del proyecto abierto **Brain Project**.

**Brain Project**  
Repositorio: https://github.com/itayinbarr/brainproject  
Modelo utilizado: `brain-atlas/models/brain.glb`  
Licencia de los activos anatómicos: **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.

El proyecto declara que el modelo deriva principalmente de **Z-Anatomy** y **BodyParts3D / DBCLS**, e integra estructuras adicionales registradas a partir de atlas de neuroimagen abiertos. Determinadas estructuras profundas y tractos son aproximaciones educativas registradas en espacio MNI y no deben utilizarse con fines clínicos.

BADBEAR.MED utiliza este modelo únicamente como recurso educativo interactivo y conserva la atribución y condiciones ShareAlike aplicables al activo 3D.


## Cerebro visual de alta calidad

La vista general de **Cerebro** utiliza el archivo abierto **Model of a human brain.glb**, publicado en MediaWiki3D a partir de una obra del **Science Museum Group**.

- Fuente: MediaWiki3D, `Model of a human brain.glb`.
- Licencia indicada para el archivo: **CC0 / dominio público**.
- Uso en BADBEAR.MED: vista visual general del cerebro.
- El atlas segmentado Brain Project se conserva para módulos como lóbulos, ganglios basales, diencéfalo, tronco, cerebelo, ventrículos y pares craneales.

BADBEAR.MED mantiene separada la capa visual general de la capa anatómica segmentada para no sacrificar calidad de render ni capacidad de estudio.
