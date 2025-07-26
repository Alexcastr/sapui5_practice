import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import UIComponent from "sap/ui/core/UIComponent";
import Event from "sap/ui/base/Event";
import Table from "sap/ui/table/Table";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import formatter from "../model/formatter";
import RowAction from "sap/ui/table/RowAction";
import RowSettings from "sap/ui/table/RowSettings";
import ListBinding from "sap/ui/model/ListBinding";

export default class Overview extends Controller {
    
    public formatter = formatter;

    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");
    }

    onPress(event: Event): void {
        const item = event.getSource() as RowAction; // El evento viene del RowAction
        const bindingContext = item.getBindingContext("invoice");
        if (bindingContext) {
            const path = bindingContext.getPath();
            const invoicePath = path.substring(1);
            const router = UIComponent.getRouterFor(this);
            router.navTo("detail", {
                invoicePath: window.encodeURIComponent(invoicePath)
            });
        }
    }

   onFilterInvoices(event: SearchField$SearchEvent): void {
    // 1. Obtener el texto de búsqueda del evento
    const query = event.getParameter("query");

    // 2. Obtener la referencia a nuestra tabla
    const table = this.byId("invoiceTable") as Table;

    // 3. Obtener el "binding" de las filas y HACER EL CAST a ListBinding
    // Esta es la corrección clave para que TypeScript entienda que hay un método .filter()
    const binding = table.getBinding("rows") as ListBinding;

    // 4. Si la búsqueda está vacía, eliminamos todos los filtros
    if (!query) {
        binding?.filter([]); // Pasamos un array vacío para quitar filtros
        return;
    }

    // 5. Si hay texto, creamos los filtros.
    // En este caso, buscaremos en los campos Name, Category y SupplierName.
    const filters = new Filter({
        filters: [
            new Filter("Name", FilterOperator.Contains, query),
            new Filter("Category", FilterOperator.Contains, query),
            new Filter("SupplierName", FilterOperator.Contains, query)
        ],
        and: false // 'false' significa que buscará si CUALQUIERA de las condiciones se cumple (OR)
    });

    // 6. Aplicamos el filtro al binding de la tabla
    binding?.filter(filters);
}
}
