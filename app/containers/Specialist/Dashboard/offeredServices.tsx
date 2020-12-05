import { Table } from "evergreen-ui";
import React from "react";

interface IOfferedServicesProps {}

export function OfferedServices(props: IOfferedServicesProps) {
  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Title</Table.TextHeaderCell>
        <Table.TextHeaderCell>Type</Table.TextHeaderCell>
        <Table.TextHeaderCell>Preferred Hours</Table.TextHeaderCell>
        <Table.TextHeaderCell>Rating</Table.TextHeaderCell>
        <Table.TextHeaderCell>Hourly Price</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.TextCell>
            I will landscape you backyard garden like never before
          </Table.TextCell>
          <Table.TextCell>Landscape</Table.TextCell>
          <Table.TextCell>2pm to 10pm</Table.TextCell>
          <Table.TextCell isNumber>5.0</Table.TextCell>
          <Table.TextCell isNumber>200</Table.TextCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
