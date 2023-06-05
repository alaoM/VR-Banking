import Image from 'next/image';
import React, { useState } from 'react'
import axios from 'axios';
const file = "/assets/img/client-11.png"

export const EquityAp = ({ res, user,setInfo, BASE_URL}) => {
     
    //   console.log(" res  res  res  res  EquityAp  res  res  res  res  res  res ")
    // console.log(res)

    const [Resp, setResp] = useState([]);
    const _id = res._id;
    const role_id = user.role;
    // console.log(user)
    // console.log(role_id)


    const Confirm = async () => {

        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const resp=  await axios.get(BASE_URL+'/api.php',{
            params: {
                regid: 'post_equity_confirm',
                type: 'equity',
                user: user, 
                _id:_id
            }
        },customConfig)
          setResp(resp.data)
          setInfo(resp.data)
    }

return (
        <div>
            {
                role_id == '601' ? (
                    Resp.status =='200' ? (
                        <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Re-Send Email" />
                    ):(
                        res.Verified == 'No' ? (
                            res.clusterMRC_confirm_status == "1" ?
                            <input type='button' id='alert-success' onClick={() =>do_AdminConfirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                            : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for Manager to Validate" />
                        ) : (
                            <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Re-Send Email" />
                        )
                    )
                ) : (
                    role_id =='631' ? (
                        Resp.status =='200' ? (
                            <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                        ):(
                            res.clusterMRC_confirm_status == "0" && res.groupMRC_confirm_status == "1" ?(
                                <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                            ):(
                                res.groupMRC_confirm_status == "0" && res.clusterMRC_confirm_status == "0" ?
                                <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for Manager to Validate" />
                                : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                            )

                            )
                    ) : (
                        role_id =='632' ? (
                            Resp.status =='200' ? (
                                <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                            ):(
                                res.groupMRC_confirm_status == "0" && res.areaMRC_confirm_status == "1" ?(
                                    <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                                ):(
                                    res.groupMRC_confirm_status == "0" && res.areaMRC_confirm_status == "0" ?
                                    <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for Manager to Validate" />
                                    : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                )
                           
                                )
                        ) : (
                            role_id =='633' ? (
                                Resp.status =='200' ? (
                                    <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                ):(
                                    res.areaMRC_confirm_status == "0" && res.mobileMRC_confirm_status == "1" ?(
                                        <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                                    ):(
                                        res.mobileMRC_confirm_status == "0" && res.areaMRC_confirm_status == "0" ?
                                        <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for Manager to Validate" />
                                        : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                    )

                                )
                            ) : (
                                role_id =='634' ? (
                                Resp.status =='200' ? (
                                    <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                ):(
                                    res.mobileMRC_confirm_status == "0" && res.enterprisemgtMRC_confirm_status == "1" ?(
                                        <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                                    ):(
                                        res.mobileMRC_confirm_status == "0" && res.enterprisemgtMRC_confirm_status == "0" ?
                                        <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for Manager to Validate" />
                                        : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                    )
                                    )
                            ) : (
                                role_id =='635' ? (
                                    Resp.status =='200' ? (
                                        <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                    ):(
                                        res.enterprisemgtMRC_confirm_status == "0" && res.bdsp_confirm_status == "1" ?(
                                            <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                                        ):(
                                            res.bdsp_confirm_status == "0" && res.enterprisemgtMRC_confirm_status == "0" ?
                                            <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for BDSP" />
                                            : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                        )
                                ) ): (
                                    role_id =='637' ? (
                                    Resp.status =='200' ? (
                                        <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                    ):(
                                        res.bdsp_confirm_status == "0" ?(
                                            <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                                        ):(
                                            <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                        )
                                        )
                                ) : (
                                    role_id =='638' ? (
                                        Resp.status =='200' ? (
                                            <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                        ):(
                                            res.validator_confirm_status == "0" && res.clusterMRC_confirm_status == "1" ?(
                                                <input type='button' id='alert-success' onClick={() =>Confirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                                            ):(
                                                res.validator_confirm_status == "0" && res.clusterMRC_confirm_status == "0" ?
                                                <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Waiting for Cluster Manager" />
                                                : <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="button" data-toggle="modal" data-target=".bd-example-modal-sm" value="Validated" />
                                            )
                                           
                                            )
                                    ) : (
                                        ""
                                    )
                                )
                            )


                            )
                            )
                        )
                    )
                )
            }
        </div>
    )
}

