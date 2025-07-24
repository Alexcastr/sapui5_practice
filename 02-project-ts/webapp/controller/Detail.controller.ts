import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
// YA NO NECESITAS IMPORTAR ObjectPageLayout, PERO SÍ ObjectPageHeader
import ObjectPageHeader from "sap/uxap/ObjectPageHeader"; 
import formatter from "../model/formatter";

export default class Detail extends Controller {
    public formatter = formatter; 
    
    onInit(): void {
        const router = UIComponent.getRouterFor(this);
        const detailRoute = router.getRoute("detail");
        if (detailRoute) {
            detailRoute.attachPatternMatched(this.onObjectMatched, this);
        }

        // --- INICIO DE LA CORRECCIÓN ---
        // Obtenemos el HEADER por su nuevo ID
        const pageHeader = this.byId("pageHeader") as ObjectPageHeader;
        
        // Adjuntamos el evento 'navButtonPress' AL HEADER
        if (pageHeader) {
            pageHeader.attachEvent("navButtonPress", () => {
                this.onNavBack();
            });
        }
        // --- FIN DE LA CORRECCIÓN ---
    }

    // El resto del controlador (onObjectMatched, onNavBack) es correcto y no cambia.
    onObjectMatched(event: Route$PatternMatchedEvent): void {
        const args = event.getParameter("arguments") as { invoicePath?: string };
        if (args && args.invoicePath) {
            const decodedPath = window.decodeURIComponent(args.invoicePath);
            this.getView()?.bindElement({
                path: "/" + decodedPath,
                model: "invoice"
            });
        }
    }

    onNavBack(): void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined) {
            window.history.go(-1);
        } else {
            const router = UIComponent.getRouterFor(this);
            router.navTo("overview", {}, true);
        }
    }
};