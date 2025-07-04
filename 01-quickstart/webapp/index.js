sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], (XMLView) => {
	"use strict";

	XMLView.create({
		viewName: "sapui5.view.App"  // importanten mantener el id "App" para que coincida con el controlador
	}).then((oView) => oView.placeAt("content"));
});