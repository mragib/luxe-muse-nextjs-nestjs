import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import { getAttributes, getAttributeValues } from "@/lib/data-service";
import { AddAttributeValue } from "./AddAttributeValue";
import AttributeValueTable from "./AttributeValueTable";

const AttributeValuePage = async () => {
  const { data: attributeValues } = await getAttributeValues();
  const { data: attributes } = await getAttributes();
  return (
    <div>
      <AdminPageHeader heading="Attribute Values">
        <AddAttributeValue attributes={attributes} />
      </AdminPageHeader>
      <AttributeValueTable
        attributes={attributes}
        attributeValues={attributeValues}
      />
    </div>
  );
};

export default AttributeValuePage;
