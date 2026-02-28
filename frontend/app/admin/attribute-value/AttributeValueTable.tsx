"use client";

import { getAttributeValuesColumns } from "@/columns/attribute-values";
import DataTable from "@/components/ui/DataTable";
import { Attribute, AttributeValue } from "@/lib/type";
import React from "react";

const AttributeValueTable = ({
  attributes,
  attributeValues,
}: {
  attributes: Attribute[];
  attributeValues: AttributeValue[];
}) => {
  const columns = getAttributeValuesColumns(attributes);

  return <DataTable columns={columns} data={attributeValues} />;
};

export default AttributeValueTable;
