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
                name: "manual data binding",
            }
        };
        const dataModel = new JSONModel(data);
        this.setModel(dataModel);
        
        this.getRouter().initialize();
    };

    createContent(): Control | Promise<Control | null> | null {
        return XMLView.create({
            "viewName": "02-project-ts.view.App",
            "id": "app"
        });
    };
};