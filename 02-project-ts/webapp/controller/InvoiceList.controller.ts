import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
// for SearchField and Filter imports
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import UIComponent from "sap/ui/core/UIComponent";


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

    onPress(): void {
        const router = UIComponent.getRouterFor(this);
        router.navTo("detail");
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
