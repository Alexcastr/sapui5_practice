import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

export default class Detail extends Controller {
    
    public onInit(): void {
        const router = UIComponent.getRouterFor(this);
        // Escuchamos el evento de la ruta "detail" para saber cuándo navegaron a esta vista
        router.getRoute("detail")?.attachPatternMatched(this.onObjectMatched, this);
    }

    // Esta función se ejecuta cuando la URL coincide con el patrón de la ruta "detail"
    public onObjectMatched(event: Route$PatternMatchedEvent): void {
        // Obtenemos el parámetro 'invoicePath' que pasamos desde la tabla
        const args = event.getParameter("arguments") as { invoicePath?: string };
        if (args && args.invoicePath) {
            // Decodificamos la ruta para que sea un path válido para el binding
            const decodedPath = window.decodeURIComponent(args.invoicePath);
            // Hacemos el binding de toda la vista al producto específico
            this.getView()?.bindElement({
                path: "/" + decodedPath,
                model: "invoice" // Seguimos usando el modelo "invoice"
            });
        }
    }

    // Función para navegar hacia atrás
    public onNavBack(): void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined) {
            window.history.go(-1);
        } else {
            // Si no hay historial, volvemos a la vista principal
            const router = UIComponent.getRouterFor(this);
            router.navTo("overview", {}, true);
        }
    }
};
