export const searchFunc = (tables, search, modal = false) => {
  return modal
    ? tables.supervisee.filter((item) => {
        if (
          item.id.toString().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.project
            .toLowerCase()
            .toString()
            .includes(search.toLowerCase()) ||
          item.industry.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      })
    : tables.filter((item) => {
        if (
          item.supervisor.toLowerCase().includes(search.toLowerCase()) ||
          item.project.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else if (item.industry.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else if (
          item.supervisee.length.toString().includes(search.toLowerCase())
        ) {
          return true;
        } else if (
          item.supervisorId.toString().includes(search.toLowerCase())
        ) {
          return true;
        }
      });
};
