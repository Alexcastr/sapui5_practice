import ResourceModel from "sap/ui/model/resource/ResourceModel";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import XMLView from "sap/ui/core/mvc/XMLView";
import Control from "sap/ui/core/Control";

/**
* @namespace 02-project-ts
*/
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"],
        "manifest": "json" 
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
            bundleName: "02-project-ts.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");
        
        this.getRouter().initialize();
    };

    createContent(): Control | Promise<Control | null> | null {
        return XMLView.create({
            "viewName": "02-project-ts.view.App",
            "id": "app"
        });
    };
};