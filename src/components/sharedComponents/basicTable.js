import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersAction } from '../../actions/allUsersAction';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { apiUrl } from '../../url/apiUrl';
import $ from 'jquery'
import AlertMessage from "./alert";
import Logo from "./image.png";
import { Success, Danger, Info } from "./iconType";
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
            errorMessage: '',
            message: '',
            alertType: '',
            iconType: '',
        }
        this.mobileUpdateStatus = this.mobileUpdateStatus.bind(this);
        // this.mobileUpdateStatus = this.mobileUpdateStatus.bind(this);
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
            this.setState({ message: error.message, alertType: 'danger', iconType: Danger })
            setTimeout(() => this.setState({ message: '' }), 3000)
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
            // const history = useHistory()
            this.setState({ loading: true })
            this.setState({ errorMessage: 'Data loading.....' })
            await this.props.usersAction(token, response => {
                if (response) {
                    if (response.error === false) {
                        const data = response.data
                        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                        this.setState({
                            pageCount: Math.ceil(data.length / this.state.perPage),
                            orgtableData: data,
                            users: slice,
                            loading: false,
                            errorMessage: ''
                        })
                    }
                    else if (response.error === true && response.message === 'Unauthorized Access') {
                        this.setState({ message: response.message, alertType: 'danger', iconType: Danger })
                        this.setState({ errorMessage: response.message })
                        setTimeout(() => this.setState({ message: '' }), 3000)
                        window.location.assign('/')
                    }
                    else if (response.error === true && !response.message === 'Unauthorized Access') {
                        this.setState({ message: response.message, alertType: 'info', iconType: Info })
                        setTimeout(() => this.setState({ message: '' }), 3000)
                    }
                }
            })
        }
        catch (error) {
            this.setState({ message: error.message, alertType: 'danger', iconType: Danger })
            setTimeout(() => this.setState({ message: '' }), 3000)
        }
    }

    sendRequest = async (id, status) => {
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: `Basic ${token}`
            }
            const response = await axios({
                method: 'put',
                headers,
                url: `${apiUrl.updateStatus}?id=${id}`,
                data: { status: status }
            });
            if (response && response.data.success === true) {
                return response.data
            }
            else {
                return response.data
            }
        }
        catch (error) {
            this.setState({ message: error.message, alertType: 'danger', iconType: Danger })
            setTimeout(() => this.setState({ message: '' }), 3000)
        }
    }

    updateUserStatus = async (id) => {
        try {
            let status = parseInt($(`#${id}`).attr('status'))
            if (status === 1) {
                const data = await this.sendRequest(id, 0)
                if (data && data.success === true) {
                    $(`#${id}`).removeClass('fa-toggle-on').addClass('fa-toggle-off')
                    $(`#${id}`).attr('status', `${data.data.status}`)
                    this.setState({ message: data.message, alertType: 'success', iconType: Success })
                    setTimeout(() => this.setState({ message: '' }), 3000)
                }
                else {
                    this.setState({ message: data.message, alertType: 'info', iconType: Info })
                    setTimeout(() => this.setState({ message: '' }), 3000)
                }
            }
            else {
                const data = await this.sendRequest(id, 1)
                if (data && data.success === true) {
                    $(`#${id}`).removeClass('fa-toggle-off').addClass('fa-toggle-on')
                    $(`#${id}`).attr('status', `${data.data.status}`)
                    this.setState({ message: data.message, alertType: 'success', iconType: Success })
                    setTimeout(() => this.setState({ message: '' }), 3000)
                }
                else {
                    this.setState({ message: data.message, alertType: 'info', iconType: Info })
                    setTimeout(() => this.setState({ message: '' }), 3000)
                }
            }
        }
        catch (error) {
            this.setState({ message: error.message, alertType: 'danger', Danger })
        }
    }

    mobileUpdateStatus() {
        $(document).ready(function () {
            $("td").click(function () {
                console.log('clicked')
                alert("Handler for .click() called.");
                $(this).hide();
            });
        });
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
        const {  loading, users, pageCount, errorMessage, alertType, message, iconType } = this.state
        const imageUrl = `${apiUrl.imageUrl}images/`
        return (
            <div>
                <div className="mt-4 mb-4">
                    {message && <AlertMessage alertType={alertType} message={message} iconType={iconType} />}
                    {/* <CssBaseline /> */}
                </div>
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
                                        <td data-label={dataLabel[4]}>{item.status === 1 ? <i className="fas fa-toggle-on" id={item._id} status={item.status} onClick={() => this.updateUserStatus(item._id)}></i> : <i className="fas fa-toggle-off" status={item.status} id={item._id} onClick={() => this.updateUserStatus(item._id)}></i>}</td>
                                    </tr>
                                )
                            }) : <tr className="text-center"><td className="text-center">{errorMessage}</td></tr>}
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
    // const { verified } = state.tokenReducer;
    return {
        users,
        // verified
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ usersAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable)