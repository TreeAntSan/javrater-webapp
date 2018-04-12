import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

import TagsTipped from "./TagsTipped";

const MovieTable = props => (
  <Table celled compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ProdCode</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Genre</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Tags</Table.HeaderCell>
        {props.showCreatedBy && <Table.HeaderCell>Created By</Table.HeaderCell>}
        {props.showDelete && <Table.HeaderCell>Delete</Table.HeaderCell>}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.movies.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.prodCode}</Table.Cell>
          <Table.Cell>{row.title}</Table.Cell>
          <Table.Cell>{row.genre.code} ({row.genre.description})</Table.Cell>
          <Table.Cell>{row.rating.rating}</Table.Cell>
          <Table.Cell>{row.tags.length ?
            <TagsTipped tags={row.tags} /> :
            <i>(No Tags)</i>
          }</Table.Cell>
          {props.showCreatedBy &&
            <Table.Cell>
              <Link to={`/user/${row.createdBy.id}`}>
                {row.createdBy.name}
              </Link>
            </Table.Cell>}
          {props.showDelete &&
            <Table.Cell>
              <button onClick={e => props.onDelete(e, row.id)}>Delete</button>
            </Table.Cell>}
        </Table.Row>
      ))}
    </Table.Body>
    {/* TODO Add pagination */}
  </Table>
);

MovieTable.propTypes = {
  movies: PropTypes.array.isRequired,
  showCreatedBy: PropTypes.bool,
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default MovieTable;
