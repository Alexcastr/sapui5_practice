
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Filter from "sap/ui/model/Filter";

export function applyProductFilter(binding: ListBinding, query: string) {
  if (!query) {
    binding.filter([]);
  } else {
    const filters = new Filter({
      filters: [
        new Filter("Name",          FilterOperator.Contains, query),
        new Filter("Category",      FilterOperator.Contains, query),
        new Filter("SupplierName",  FilterOperator.Contains, query)
      ],
      and: false
    });
    binding.filter(filters);
  }
}
