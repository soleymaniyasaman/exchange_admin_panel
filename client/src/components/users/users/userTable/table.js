import React, { useContext } from "react";

import BootstrapTable from 'react-bootstrap-table-next';

import { v4 as uuidv4 } from 'uuid';

import './style.scss';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheck, faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from '../../../context/provider';

import { Link } from 'react-router-dom'

import paginationFactory, {

  PaginationProvider,

  PaginationListStandalone,

  PaginationTotalStandalone,

  SizePerPageDropdownStandalone

} from 'react-bootstrap-table2-paginator';



function UserTable() {

  const data = useContext(UserContext);

  const { SearchBar } = Search;

  const numDiscriminant = (input) => {

    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/");

  }

  const authenticationFormatter = (cell, index) => {

    return (

      <>

        <div className="authContainer">

          <p className="PriceComponent_tableNamePersian" key={index}>

            {cell === true ? "احراز هویت شده" : "احراز هویت نشده"}

          </p>

          {cell === true ?

            <img src="/assets/drawer/check_circle-24px.svg" />

            :

            <img src="/assets/drawer/cancel-24px (1).svg" />

          }

        </div>

      </>

    )

  }

  const nameFormatter = (cell, row) => {

    return (

      <>

        {/* {console.log(row)} */}

        {row ? (

          <>

            {/* {console.log(row)} */}

            <p className="PriceComponent_tableNamePersian" style={{ opacity: "0.8" }}>{row.firstName}</p>

            <p className="PriceComponent_tableNamePersian" style={{ opacity: "0.8" }}>{row.lastName}</p>

          </>

        ) : null}

      </>

    )

  }

  const phoneFormatter = (cell, index) => {

    return (

      <p className="PriceComponent_tablePrice" >{cell}</p>

    )

  }

  const identifyCodeFormatter = (cell, index) => {

    return (

      <p className="PriceComponent_tableRam" style={{ opacity: "0.8" }} key={index}>{cell}</p>

    )

  }

  const editFormatter = (cell, index, rowIndex) => {

    return (

      <div key={rowIndex}>

        <Link className="m-0 p-0 text-decoration-none" to={`/edit?index=${rowIndex}`} >

          <div className="adminPanel_products_products_productsList_table_icon p-1" >

            <p>

              اطلاعات کاربری

            </p>

          </div>

        </Link>

      </div>

    )

  }

  const columns = [{

    dataField: 'persianName',

    text: 'نام کاربر',

    // sort: true,

    align: 'center',

    headerStyle: () => {

      return { width: "20%" };

    },

    style: {

      // opacity: "0.8" ,

      paddingTop: '17px',

      display: 'flex',

      justifyContent: 'center'

    },

    filterValue: (cell, row) => [row.firstName, row.lastName],

    formatter: nameFormatter,

  }, {

    dataField: 'mobileNum',

    text: 'شماره موبایل',

    sort: true,

    sortFunc: (a, b, order) => {

      if (order === 'desc') return a.price.price > b.price.price ? -1 : 1;

      else { return a.price.price > b.price.price ? 1 : -1 };

    },

    // headerFormatter: (column, index, { sortElement, filterElement }) => {

    //   // const { caret = 'x' } = sortElement.props;

    //   return (

    //     <div className="PriceComponent_tableHeaderCaret">

    //       {column.text} {sortElement}

    //     </div>

    //   );

    // },

    formatter: phoneFormatter,

    headerStyle: () => {

      return { width: "20%" };

    },

    style: {

      // opacity: "0.8" ,

      paddingTop: '17px'

    },

  }, {

    dataField: 'identifyCode',

    text: 'کد ملی',

    // sort: true,

    headerStyle: () => {

      return { width: "20%" };

    },

    style: {

      // opacity: "0.8" ,

      paddingTop: '17px'

    },

    formatter: identifyCodeFormatter,

  }, {

    dataField: 'isAuthentication',

    text: 'احراز هویت',

    formatter: authenticationFormatter,

    headerStyle: () => {

      return { width: "20%" };

    },

    style: {

      position: "relative",

      paddingTop: '17px'

    }

  }, {

    dataField: 'edit',

    text: '',

    formatter: editFormatter,

    headerStyle: () => {

      return { width: "20%" };

    },

    style: {

      display: 'flex',

      marginLeft: '18px',

      marginTop: '4px',

      alignItems: 'center',

      justifyContent: 'flex-end',

      alignContent: 'center',

    },

    editable: (row, rowIndex, colIndex) => {

      return true;

    },

    events: {

      onClick: (e, column, columnIndex, row, rowIndex) => {

        data.setContextRowIndex(rowIndex)

      }

    }

  }

  ];

  const defaultSorted = [{

    dataField: 'price',

    order: 'desc'

  }];

  const paginationOption = {

    custom: true,

    totalSize: data.tableData.length

  };

  const pageButtonRenderer = ({

    page,

    active,

    disabled,

    title,

    onPageChange

  }) => {

    const handleClick = (e) => {

      e.preventDefault();

      onPageChange(page);

    };

    return (

      <li key={uuidv4()} className="paginationItem">

        <a href="#" onClick={handleClick} className="paginationButton" >{page}</a>

      </li>

    )

  }

  const options = {

    pageButtonRenderer,

    hideSizePerPage: true

  };



  return (

    <PaginationProvider

      pagination={paginationFactory(options)}

    >

      {

        ({

          paginationTableProps

        }) => (



          <ToolkitProvider

            keyField="idNum"

            data={data.tableData}

            columns={columns}

            // search={ { searchFormatted: true } }

            search

            defaultSorted={defaultSorted}

          >

            {

              props => {

                const TableBottomHeader = () => {

                  return (

                    <div className="priceComponent_tableSearchContainer ">

                      <div className="adminPanel_products_productsLists_table_search col-lg-3 col-md-4 col-5">

                        <SearchBar

                          {...props.searchProps}

                          placeholder="جستجو..."

                          className="adminPanel_products_productsLists_table_searchBox"

                          delay={10}

                        />

                        <img className="priceComponent_tableSearchBoxImg" src="/assets/drawer/magnify.svg" alt="" />

                      </div>

                    </div>

                  )

                }

                const TableBottom = () => {

                  return (

                    <div className="PriceComponent_tableContainerSingleBrand">

                      <div className="PriceComponent_tableBodyContainer">

                        <BootstrapTable

                          {...props.baseProps}

                          bordered={false}

                          // hover

                          keyField="idNum"

                          id="table"

                          bodyClasses="priceComponent_tableBody"

                          headerClasses="adminPanel_products_productsLists_table_header text-nowrap"

                          rowClasses="PriceComponent_tableRow"

                          {...paginationTableProps}

                        />

                      </div>

                      <div className="PriceComponent_tableLeftBrand">

                      </div>

                    </div>

                  )

                }

                return (

                  <div className="adminPanel_products_productsLists_table_container me-3">

                    {TableBottomHeader()}

                    {TableBottom()}

                  </div>

                )

              }

            }

          </ToolkitProvider>

        )

      }



    </PaginationProvider>

  )

}





export default UserTable

