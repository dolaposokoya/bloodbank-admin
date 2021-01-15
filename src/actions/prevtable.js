import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersAction } from '../../actions/allUsersAction'
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { apiUrl } from '../../url/apiUrl';
import $ from 'jquery'
import './table.css'

const token = localStorage.getItem('token')

class BasicTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            users: [],
            offset: 0,
            perPage: 5,
            pageCount: 0,
            orgtableData: [],
            currentPage: 0,
            waiting: 'Data loading.....'
        }
    }

    componentDidMount = async () => {
        await this.getAllUsers();
    }


    loadMoreData() {
        const data = this.state.orgtableData;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            users: slice
        })

    }

    sortUser = async (fieldName) => {
        try {
            this.setState({ loading: true })
            let orderBy = $(this).attr('order')
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Basic ${apiUrl.basicAuth}`,
                token: `Bearer ${token}`
            }
            const newOrder = orderBy === undefined ? 1 : orderBy
            const response = await axios.get(`${apiUrl.sortAllUsers}?fieldName=${fieldName}&orderBy=${parseInt(newOrder)}`, { headers })
            const data = response.data.data
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgtableData: data,
                users: slice,
                loading: false
            })
            if (orderBy === -1) {
                $(this).attr('order', 1)
            }
            else {
                $(this).attr('order', -1)
            }
        }
        catch (error) {
        }

    }

    handlePageClick = (event) => {
        const selectedPage = event.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    }

    getAllUsers = async () => {
        try {
            this.setState({ loading: true })
            await this.props.usersAction(token, response => {
                if (response) {
                    if (response.error === false) {
                        const data = response.data
                        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                        this.setState({
                            pageCount: Math.ceil(data.length / this.state.perPage),
                            orgtableData: data,
                            users: slice,
                            loading: false
                        })
                    }
                    else if (response.error === true) {
                        alert(response.message)
                    }
                }
            })
        }
        catch (error) {
            alert(error.message)
        }
    }

    getOneUser = async (id) => {
        console.log('User id', id)
    }

    render() {
        const dataLabel = [
            'Name',
            'Gender',
            'Blood Group',
            'City',
            'View Details'
        ]
        const { waiting, loading, users, pageCount } = this.state
        return (
            <div>
                <div className="form-inline mt-5">
                    <div className="input-group input-group-md mb-3 search">
                        <input className="form-control mb-2" type="search" id="search-query" placeholder="Search"
                            aria-label="Search" style={{
                                borderRadius: '7px', width: '100%', height: ' 40px',
                                outline: 'hidden'
                            }} />
                    </div>
                </div>
                <div className="card mb-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><i className="fas fa-sort" order="1" onClick={() => this.sortUser('first_name')}></i> Name</th>
                                <th scope="col"><i className="fas fa-sort" order="1" onClick={() => this.sortUser('gender')}></i> Gender</th>
                                <th scope="col"><i className="fas fa-sort" order="1" onClick={() => this.sortUser('blood_group')}></i> Blood Group</th>
                                <th scope="col"><i className="fas fa-sort" order="1" onClick={() => this.sortUser('city')}></i> City</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className="user-list">
                            {loading === false ? users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td data-label={dataLabel[0]}>{item.first_name}</td>
                                        <td data-label={dataLabel[1]}>{item.gender}</td>
                                        <td data-label={dataLabel[2]}>{item.blood_group}</td>
                                        <td data-label={dataLabel[3]}>{item.city}</td>
                                        <td data-label={dataLabel[4]}><button className="contact-btn btn-outline-primary" onClick={() => this.getOneUser(item._id)}>View Details</button></td>
                                    </tr>
                                )
                            }) : <tr className="text-center"><td className="text-center">{waiting}</td></tr>}
                        </tbody>
                    </table>
                </div>
            <div>
            <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { users } = state.usersReducer
    return {
        users
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ usersAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable)