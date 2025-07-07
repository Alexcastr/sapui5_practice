import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
/**
 * @name ui5.02-project-ts.controller.App
 */
export default class AppController extends Controller {

    onInit() : void {
      // set data model on view
        const data = {
           recipient: {
              name: "It is a pleasure to meet you!"
           }
        };
        const dataModel = new JSONModel(data);
        this.getView()?.setModel(dataModel);
    }
    onShowHello(): void {
        MessageToast.show("Hello World");
     }
};