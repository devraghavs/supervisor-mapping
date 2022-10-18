import { useState, useMemo } from "react";

export const useSortableData = (
  { sortData: tables, modal: modal, activeBtn: paginate },
  config = null
) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedItems = useMemo(() => {
    let sortableItems = [...tables];
    console.log(modal);
    if (modal) {
      sortableItems = tables[0];
    }

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tables, sortConfig]);

  const requestSort = (key) => {
    if (!modal) {
      paginate(1);
    }
    let direction = "ascending";
    if (key === "checked") {
      direction = "descending";
    }
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { tables: sortedItems, requestSort, sortConfig };
};

export const getClassNamesFor = (name, sortConfig) => {
  if (!sortConfig) {
    return;
  }
  return sortConfig.key === name ? sortConfig.direction : undefined;
};
