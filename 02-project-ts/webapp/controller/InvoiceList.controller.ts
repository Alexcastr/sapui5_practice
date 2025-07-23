import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
// for SearchField and Filter imports
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import UIComponent from "sap/ui/core/UIComponent";

import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";

/**
 * @namespace 02-project-ts.controller
 */
export default class App extends Controller {

    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");
    }

    onPress(event: Event): void {
        // 1. Obtenemos el elemento de la lista que disparó el evento.
        const item = event.getSource() as ObjectListItem;

        // 2. Obtenemos el contexto de datos del modelo "invoice".
        // Esto puede devolver 'undefined' si no hay contexto, por eso es opcional.
        const bindingContext = item.getBindingContext("invoice");

        // 3. Guarda de Tipo (Type Guard): ¡El paso más importante!
        // Solo continuamos si el bindingContext realmente existe.
        if (bindingContext) {

            // 4. Ahora que sabemos que bindingContext no es nulo, obtenemos la ruta de forma segura.
            // El path será algo como "/Invoices(0)" o "/Invoices(1)".
            const path = bindingContext.getPath();

            // 5. Preparamos el parámetro para la URL.
            // Quitamos la barra inicial "/" y lo codificamos para que sea seguro en una URL.
            const invoicePath = path.substring(1); // ej: "Invoices(0)"

            // 6. Obtenemos el router y navegamos a la vista de detalle.
            const router = UIComponent.getRouterFor(this);
            router.navTo("detail", {
                // Pasamos el path ya procesado y seguro.
                invoicePath: window.encodeURIComponent(invoicePath)
            });
        }
        // Si no hay bindingContext, la función simplemente no hace nada,
        // evitando cualquier error.
    }

    onFilterInvoices(event: SearchField$SearchEvent): void {
        const query = event.getParameter("query");

        if (!query) {
            // Si no hay query, quitamos los filtros
            const list = this.byId("invoiceList");
            const binding = list?.getBinding("items") as ListBinding;
            binding?.filter([]);
            return;
        }

        // Filtro por dos campos: ProductName Y QuantityPerUnit
        const filters = new Filter({
            filters: [
                new Filter("ProductName", FilterOperator.Contains, query),
                new Filter("ShipperName", FilterOperator.Contains, query)
            ],
            and: false // false = operador OR, true = AND
        });

        const list = this.byId("invoiceList");
        const binding = list?.getBinding("items") as ListBinding;
        binding?.filter(filters);
    }
};
