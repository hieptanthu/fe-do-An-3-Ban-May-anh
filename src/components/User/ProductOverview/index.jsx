import React from "react";

function ProductOverview({ txtHtml }) {
  console.log(txtHtml);
  return (
    <div className="container">
      <div className="row">
        <div dangerouslySetInnerHTML={{ __html: txtHtml }} />
      </div>
    </div>
  );
}

export default ProductOverview;
