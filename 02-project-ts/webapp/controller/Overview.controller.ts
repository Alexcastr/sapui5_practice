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
        const query = event.getParameter("query");
        const table = this.byId("invoiceTable") as Table;
        const binding = table.getBinding("rows");

        if (!query) {
            // binding.filter([]);
            return;
        }

        const filters = new Filter({
            filters: [
                new Filter("ProductName", FilterOperator.Contains, query),
                new Filter("ShipperName", FilterOperator.Contains, query)
            ],
            and: false
        });

        // binding.filter(filters);
    }
}