import XMLView from "sap/ui/core/mvc/XMLView";

XMLView.create({
    viewName: "02-project-ts.view.App"
}).then(function (view) {
    view.placeAt("content");
});