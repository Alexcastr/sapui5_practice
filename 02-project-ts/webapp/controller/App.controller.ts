import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
/**
 * @name ui5.02-project-ts.controller.App
 */
export default class AppController extends Controller {

    onInit(): void {
        // set data model on view
        const data = {
            recipient: {
                name: "It is a pleasure to meet you!"
            }
        };
        const dataModel = new JSONModel(data);
        this.getView()?.setModel(dataModel);


        const i18nModel = new ResourceModel({
            bundleName: "02-project-ts.i18n.i18n"
        });
        this.getView()?.setModel(i18nModel, "i18n");
    }
    onShowHello(): void {
        // read msg from i18n model
        const recipient = this.getView()?.getModel()?.getProperty("/recipient/name");
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";


        // show message
        MessageToast.show(msg);
    }
};