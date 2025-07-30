import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";

import MessageToast from "sap/m/MessageToast";
import ProductRating, { ProductRating$ChangeEvent } from "../control/ProductRating";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
export default class Detail extends Controller {

    // en onInit():
    onInit(): void {
        const router = UIComponent.getRouterFor(this);

        // Obtenemos la ruta y la guardamos en una variable
        const detailRoute = router.getRoute("detail");

        // "Guarda": Si la ruta existe (no es undefined), entonces le adjuntamos el evento.
        if (detailRoute) {
            detailRoute.attachPatternMatched(this.onObjectMatched, this);
        }
    }

    // en onObjectMatched():
    onObjectMatched(event: Route$PatternMatchedEvent): void {

        (<ProductRating>this.byId("rating")).reset();
        this.getView()?.bindElement({
            path: "/" + window.decodeURIComponent((<any>event.getParameter("arguments")).invoicePath),
            model: "invoice"
        });
    }

    onNavBack(): void {
        const history = History.getInstance();

        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined) {
            console.log("Previous Hash:", previousHash);
            window.history.go(-1);
        } else {
            const router = UIComponent.getRouterFor(this);
            router.navTo("overview", {}, true);
        }
    }
    onRatingChange(event: ProductRating$ChangeEvent): void {
        const value = event.getParameter("value")!;
        const oView = this.getView();
        const oResModel = oView?.getModel("i18n");
        if (!oResModel) {
            // no i18n model? bail or show a plain toast
            MessageToast.show(`You rated ${value}`);
            return;
        }
    }

}