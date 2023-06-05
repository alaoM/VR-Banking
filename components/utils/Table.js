import React, { useEffect, useRef } from "react";
import $ from "jquery";
import dt from "datatables.net";
$.DataTable = dt;

const DataTable = ({ data, columns, key }) => {
  
  const tableRef = useRef(null);

  useEffect(() => {
    $(tableRef.current).DataTable({
      data: data,
      columns: columns, 
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
          previous:
            '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
        },
      },
    });
    return () => {
      $(tableRef.current).DataTable().destroy();
    };
  }, [data, columns]);

  return (
    <table       
      ref={tableRef}
      className="display table table-striped table-responsive-sm"
         >
      <thead className="thead-dark"  >
        <tr>
          {columns.map((column) => (
            <th key={key}>{column.title}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default DataTable;
