import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
/**
 * @name ui5.02-project-ts.controller.App
 */
export default class AppController extends Controller {
  onInit(): void {
        this.getView()?.addStyleClass((<Component> this.getOwnerComponent())?.getContentDensityClass())
    }
};
