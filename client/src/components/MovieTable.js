import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

import TagsTipped from "./TagsTipped";

const MovieTable = ({ movies }) => (
  <Table celled compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ProdCode</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Genre</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Tags</Table.HeaderCell>
        <Table.HeaderCell>Author</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {movies.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.prodCode}</Table.Cell>
          <Table.Cell>{row.title}</Table.Cell>
          <Table.Cell>{row.genre.code} ({row.genre.description})</Table.Cell>
          <Table.Cell>{row.rating.rating}</Table.Cell>
          <Table.Cell>{row.tags.length ?
            <TagsTipped tags={row.tags} /> :
            <i>(No Tags)</i>
          }</Table.Cell>
          <Table.Cell>{row.createdBy.name}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    {/* TODO Add pagination */}
  </Table>
);

MovieTable.propTypes = {
  movies: PropTypes.object.isRequired,
};

export default MovieTable;
