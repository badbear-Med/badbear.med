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


## HuBMAP / Human Reference Atlas

BADBEAR.MED puede cargar modelos 3D abiertos del **HuBMAP Human Reference Atlas (HRA) CCF 3D Reference Object Library** para ampliar la cobertura anatómica.

Modelos integrados en el visor:
- corazón y vasculatura sanguínea;
- pulmones;
- hígado;
- páncreas;
- intestino delgado y colon;
- riñones y vejiga urinaria;
- médula espinal;
- timo;
- útero y ovarios;
- próstata.

Licencia indicada por la biblioteca HRA: **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

Fuente: `hubmapconsortium/ccf-releases`, biblioteca de objetos anatómicos de referencia 3D.

## Corazón segmentado

La vista detallada del corazón utiliza el modelo distribuido por **OrganUI Heart**, derivado de **BodyParts3D**.

Crédito requerido:
`BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.`

El modelo incluye estructuras separables como aurículas, ventrículos, aorta, tronco pulmonar, vena cava superior y arterias coronarias.

## Órganos internos BodyParts3D

La vista general de órganos internos puede cargar el recurso `anatomy-organs.glb` publicado por `yamz8/human-body-simulator`, derivado de BodyParts3D.

- Fuente anatómica original: BodyParts3D, Database Center for Life Science.
- Licencia indicada para ese derivado: **CC BY-SA 2.1 Japan**.
- La obligación ShareAlike aplica al activo derivado identificado y sus adaptaciones, no al código independiente de BADBEAR.MED.

## Estómago

La vista de estómago utiliza el GLB preparado por **MedPath 3D** a partir de BodyParts3D.

Crédito:
`BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.`

BADBEAR.MED consume estos archivos como modelos anatómicos abiertos y conserva sus avisos de procedencia y licencia en este documento.
