import { User } from "./models";

export const columns = [
  {
    field: "id",
    headerName: "ID",
    renderCell: (params: { row: User }) => {
      return params.row.Id;
    },
    flex: 0.5,
  },
  {
    field: "Username",
    flex: 1,
  },
  {
    field: "Name",
    flex: 1,
  },
  {
    field: "FatherLastName",
    flex: 1,
  },
  {
    field: "CreationDate",
    flex: 1,
  },
  {
    field: "Email",
    flex: 1,
  },
  {
    field: "PhoneNumber",
    flex: 1,
  },
];
