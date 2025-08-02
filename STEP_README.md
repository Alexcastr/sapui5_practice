step by step


1. globally install **npm install --global @ui5/cli**
2. créate **webapp** folder 
3. **index.html** with the necesary dependencies 


```Html

    <script id="sap-ui-bootstrap"
		src="resources/sap-ui-core.js"
		data-sap-ui-libs="sap.m"
		data-sap-ui-compat-version="edge"
		data-sap-ui-async="true"
		data-sap-ui-on-init="module:test1/index"
		data-sap-ui-resource-roots='{
			"test1": "./"
		}'>
	</script>

  <body class="sapUiBody" id="content"></body>

```

4. create **index.ts**
```Bash

sap.ui.define([
	"sap/m/Button",
	"sap/m/MessageToast"
], (Button, MessageToast) => {
	"use strict";

	new Button({
		text: "Ready...",
		press() {
			MessageToast.show("Hello World!");
		}
	}).placeAt("content");

});

```

5. install using **ui5**  
  - ui5 use OpenUI5
  - ui5 add sap.m sap.tnt sap.ui.core sap.ui.layout themelib_sap_horizon
  - **npm install typescript ui5-tooling-transpile --save-dev**  ts middlaware

6. configure the ui5.yml middlaware 

```Bash

server:
  customMiddleware:
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
      configuration:
        debug: true
```

7. package.json

```Bash

{
 { "name": "test1",
  "version": "1.0.0",
  "description": "The UI5 test1 tutorial",
  "scripts": {
      "start": "ui5 serve -o index.html"
  },
  "devDependencies": {
    "@ui5/cli": "^4.0.22"
}

```

8. tsconfig.json

```Js

{
    "compilerOptions": {
      "target": "es2023",
      "module": "es2022",
      "moduleResolution": "node",
      "skipLibCheck": true,
      "allowJs": true,
      "strict": true,
      "strictPropertyInitialization": false,
      "rootDir": "webapp",
      "baseUrl": "./",
      "paths": {
        "test1/*": ["webapp/*"]
      }
    },
    "include": ["webapp/**/*"]
}

```

9. npm run start


10. Create **view** and **controller** folder with his files **App.view.xml** and **App.controller.ts**

```Js

# App.view.xml
<mvc:View
   controllerName="test1.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
    <Button
      text="Say Hello"
      press=".onShowHello"/>
</mvc:View>

#App.controller.ts

import Controller from "sap/ui/core/mvc/Controller";

export default class AppController extends Controller {
    onShowHello(): void {
        // show a native JavaScript alert
        alert("Hello World");
     }
};


```

11. Types definitions need it **npm install @types/openui5 --save-dev**


12. Configure the i18n and JModel 
  - create **i18n** folder and **i18n.properties** 
  - in the app controller create the function **inInit()** and charge the json model and set the model 

```Js
  
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";

/**
 * @name ui5.test1.controller.App
 */
export default class AppController extends Controller {


    onInit(): void {

        const data = {
            recipient: {
                name: "World"
            }
        };
        const dataModel = new JSONModel(data);
        // because of "strict" mode in tsconfig.json a null check is required for this.getView()
        this.getView()?.setModel(dataModel);


        const i18nModel = new ResourceModel({
            bundleName: "test1.i18n.i18n"
        });
        this.getView()?.setModel(i18nModel, "i18n");
    }
    onShowHello(): void {
        const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }
};
  
```

13. **Component.ts** configuration
- in this component you will pass all the app.controller config you made before without the **onShowHello** method
- clean the **app.controller.ts** and add the component container in the **index.ts**

```JS
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
* @namespace test1
*/
export default class Component extends UIComponent {
public static metadata = {
"interfaces": ["sap.ui.core.IAsyncContentCreation"]
};
    init(): void {
        // call the init function of the parent 
        super.init();

        // set data model
        const data = {
            recipient: {
                name: "World"
            }
        };
        const dataModel = new JSONModel(data);
        this.setModel(dataModel);

        // set i18n model
        const i18nModel = new ResourceModel({
            bundleName: "test1.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");
    };

    createContent(): Control | Promise<Control | null> | null {
        return XMLView.create({
            "viewName": "test1.view.App",
            "id": "app"
        });
    };
};


```
14. Descriptor **manifest.json** 
 - add this line to the **Component.ts** --> **"manifest": "json"** in
 - Add this line to the **index.html** **<div data-sap-ui-component data-name="ui5.walkthrough" data-id="container" data-settings='{"id" : "walkthrough"}'></div>**

15. Routing and navigation

- install npm i @sap/ux-ui5-tooling 
-  npm i ui5-middleware-livereload ui5-middleware-serveframework ui5-middleware-simpleproxy -D
- Configure ui5.yml
```JS
specVersion: "4.0"
metadata:
  name: ui5.test1
type: application
framework:
  name: OpenUI5
  version: "1.138.0"
  libraries:
    - name: sap.m
    - name: sap.tnt
    - name: sap.ui.core
    - name: sap.ui.layout
    - name: themelib_sap_horizon
    - name: sap.uxap
    - name: sap.f
    - name: sap.ui.table
server:
  customMiddleware:
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        ignoreCertError: false # If set to true, certificate errors will be ignored. E.g. self-signed certificates will be accepted
        ui5:
          path:
            - /resources
            - /test-resources
          url: https://ui5.sap.com
        backend:
          - path: /sap
            url: http://s4h22.sap4practice.com:8007
            destination: s4hana_22
    - name: fiori-tools-appreload
      afterMiddleware: compression
      configuration:
        port: 35729
        path: webapp
        delay: 300
    - name: fiori-tools-preview
      afterMiddleware: fiori-tools-appreload
      configuration:
        flp:
          theme: sap_horizon
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
      configuration:
        debug: true
        transformModulesToUI5:
          overridesToOverride: true
        excludePatterns:
          - /Component-preload.js
builder:
  customTasks:
    - name: ui5-tooling-modules-task
      afterTask: replaceVersion
    - name: ui5-tooling-transpile-task
      afterTask: replaceVersion
      configuration:
        debug: true
        transformModulesToUI5:
          overridesToOverride: true


```

- configure index.html and index.ts
- add routing in manifest.json

```Js
{
  "_version": "1.65.0",
  "sap.app": {
    "type": "application",
    "i18n": {
      "bundleName": "test1.i18n.i18n",
      "supportedLocales": [
        "es",
        "en"
      ],
      "fallbackLocale": "es"
    },
    "dataSources": {
      "invoiceRemote": {
        "uri": "/sap/opu/odata/iwbep/GWSAMPLE_BASIC",
        "type": "OData",
        "settings": {
          "odataVersion": "2.0"
        }
      }
    },
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",
    "applicationVersion": {
      "version": "1.0.0"
    },
    "id": "test1"
  },
  "sap.ui": {
    "technology": "UI5",
    "deviceTypes": {
      "desktop": true,
      "tablet": true,
      "phone": true
    }
  },
  "sap.ui5": {
    "contentDensities": {
      "compact": true,
      "cozy": true
    },
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "type": "View",
        "viewType": "XML",
        "path": "test1.view",
        "controlId": "app",
        "controlAggregation": "pages"
      },
      "routes": [
        {
          "pattern": "",
          "name": "overview",
          "target": "overview"
        },
        {
          "pattern": "detail/{invoicePath}",
          "name": "detail",
          "target": "detail"
        }
      ],
      "targets": {
        "overview": {
          "id": "overview",
          "name": "Overview"
        },
        "detail": {
          "id": "detail",
          "name": "Detail"
        }
      }
    },
    "dependencies": {
      "minUI5Version": "1.120",
      "libs": {
        "sap.ui.core": {},
        "sap.m": {},
        "sap.uxap": {},
        "sap.f": {},
        "sap.ui.table": {}
      }
    },
    "rootView": {
      "viewName": "test1.view.App",
      "type": "XML",
      "id": "app"
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "test1.i18n.i18n",
          "supportedLocales": [
            "es",
            "en"
          ],
          "fallbackLocale": "es"
        }
      },
      "invoice": {
        "dataSource": "invoiceRemote",
        "type": "sap.ui.model.odata.v2.ODataModel",
        "settings": {
          "defaultBindingMode": "TwoWay",
          "useBatch": true,
          "json": true
        }
      }
    }
  }
}


```
- add  libraries in ui5-yml   
 <!-- 
    - name: sap.uxap
    - name: sap.f
    - name: sap.ui.table -->

- add libraries in  manifest.json  
<!-- 
    "sap.uxap": {},
    "sap.f": {},
    "sap.ui.table": {} -->

- Importante agregar la linea en el **Component.ts**
// <<< ESTA LÍNEA ES LA CLAVE >>>
        this.getRouter().initialize();
