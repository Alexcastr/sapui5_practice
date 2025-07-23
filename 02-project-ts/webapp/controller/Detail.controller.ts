import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

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
        // 1. Obtener los argumentos de forma segura
        // El tipo correcto es un objeto que puede tener una propiedad 'invoicePath' de tipo string.
        const args = event.getParameter("arguments") as { invoicePath?: string };

        // 2. Solo si el argumento 'invoicePath' existe, continuamos.
        if (args && args.invoicePath) {
            const decodedPath = window.decodeURIComponent(args.invoicePath);

            // 3. Usamos Optional Chaining (?.) para llamar a .bindElement()
            // Esto significa: "Si this.getView() devuelve una vista, llama a .bindElement() en ella.
            // Si es undefined, no hagas nada y evita el error."
            this.getView()?.bindElement({
                path: "/" + decodedPath,
                model: "invoice"
            });
        }
    }
};