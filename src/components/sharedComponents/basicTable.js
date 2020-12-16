import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersAction } from '../../actions/allUsersAction'
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { apiUrl } from '../../url/apiUrl';
import $ from 'jquery'
import Logo from "./image.png";
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
            alert(error.message)
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
        let status = $(`#${id}`).attr('status')
        console.log('userId', status)
        if (status === '1') {
            $(`#${id}`).removeClass('fa-toggle-on').addClass('fa-toggle-off')
            $(`#${id}`).attr('status', '0')
        }
        else {
            $(`#${id}`).removeClass('fa-toggle-off').addClass('fa-toggle-on')
            $(`#${id}`).attr('status', '1')
        }
    }

    render() {
        const dataLabel = [
            'Name',
            'Gender',
            'Blood Group',
            'City',
            'Status',
            'Avatar'
        ]
        const { waiting, loading, users, pageCount } = this.state
        const imageUrl = `${apiUrl.baseURL}images/`

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
                {/* \src\image\image.png */}
                <div className="card mb-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Avatar</th>
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
                                        <td data-label={dataLabel[5]}>{item.profile_image ? <img src={`${imageUrl}${item.profile_image}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="user" /> : <img src={Logo} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="user" />}</td>
                                        <td data-label={dataLabel[0]}>{item.first_name}</td>
                                        <td data-label={dataLabel[1]}>{item.gender}</td>
                                        <td data-label={dataLabel[2]}>{item.blood_group}</td>
                                        <td data-label={dataLabel[3]}>{item.city}</td>
                                        <td data-label={dataLabel[4]}>{item.approved ? <i className="fas fa-toggle-on" id={item._id} status="1" onClick={() => this.getOneUser(item._id)}></i> : <i className="fas fa-toggle-off" status="0" id={item._id} onClick={() => this.getOneUser(item._id)}></i>}</td>
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