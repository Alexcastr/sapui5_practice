
import UIComponent from "sap/ui/core/UIComponent";
import ListBinding from "sap/ui/model/ListBinding";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
// import formatter from "../model/formatter";
import RowAction from "sap/ui/table/RowAction";

import Event from "sap/ui/base/Event";
import Table from "sap/ui/table/Table";

import { SearchField$SearchEvent } from "sap/m/SearchField";
import { applyProductFilter } from "../utils/filterHelper";

export default class Overview extends Controller {

    // public formatter = formatter;
    /** Este método lo compartiremos */
    public triggerFilter(query: string) {
        const oEventBus = this.getOwnerComponent()?.getEventBus();
        oEventBus?.publish("MyAppChannel", "FilterProducts", { query });
    }

    /** Ejemplo: llamas a triggerFilter desde algún botón extra */
    public onCustomButtonPress(): void {
        // por ejemplo, leer el valor de otro Input
        const customQuery = "algún texto";
        this.triggerFilter(customQuery);
    }

    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");
        this.getOwnerComponent()!
            .getEventBus()
            .subscribe(
                "MyAppChannel",
                "FilterProducts",
                this._onFilterRequested,
                this
            );
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

    private _onFilterRequested(
        _sChannel: string,
        _sEvent: string,
        data: object
    ): void {
        const { query } = data as { query: string };
        const table = this.byId("invoiceTable") as Table;
        const binding = table.getBinding("rows") as ListBinding;
        applyProductFilter(binding, query);
    }

    public onExit(): void {
        this.getOwnerComponent()!
            .getEventBus()
            .unsubscribe(
                "MyAppChannel",
                "FilterProducts",
                this._onFilterRequested,
                this
            );
    }


    public onFilterInvoices(event: SearchField$SearchEvent): void {
        const query = event.getParameter("query") || "";
        // **solo** publícalo:
        this.getOwnerComponent()!
            .getEventBus()
            .publish("MyAppChannel", "FilterProducts", { query });
    }
}
