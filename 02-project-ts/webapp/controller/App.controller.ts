import Controller from "sap/ui/core/mvc/Controller";

/**
 * @name ui5.02-project-ts.controller.App
 */
export default class AppController extends Controller {
    onShowHello(): void {
        // show a native JavaScript alert
        alert("Hello World");
     }
};