import Image from 'next/image';
import React, { useState } from 'react'
import axios from 'axios';
const file = "/assets/img/client-11.png"

export const Cluster = ({ res, role_id,setInfo, BASE_URL }) => {
    // console.log(role_id)
    // console.log(res[0].clusterMRC_confirm_status )
    // console.log(res[0].groupMRC_confirm_status )


    const [Resp, setResp] = useState([]);
    const _id = res[0].referral_code;
  

    const do_AdminConfirm = async (_id)=>{
        console.log(`"Admin "${_id}`)
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
       const resp=  await axios.get(BASE_URL+'/api.php',{
        params: {
            regid: 'doAdminclusterConfirm', 
            _id:_id 
        }
        },customConfig)
        console.log(resp)
        
         setResp(resp.data)

         setInfo(resp.data) 


    }
    


    function do_ClusterConfirm(_id){
        console.log("cluster")
    }
    function do_GroupValidate(_id){
        console.log("group")
    }
    function AreaValidateEnterprise(){
        const _id = res[0].referral_code;
        console.log("area", _id )
    }
    function MobileValidateEnterprise(_id){
        console.log("mobile")
    }
    function EnterpriseMValidateEnterprise(_id){
        console.log("enterprise")
    }

    if(role_id === '601'){

        
    }
      

return (
        <div>
            {
             
                role_id === '601' ? (
                    Resp.status =='200' ? (
                        <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Re-Send Email" />
                       
                    ):(
                        res[0].Verified == 'No' ? (
                            <input type='button' id='alert-success' onClick={() =>do_AdminConfirm(_id)} value='Confirm'  className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' />
                        ) : (
                            <input id="alert-success" className="btn btn-outline-success btn-icon m-1 float-right" name="submit" type="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="Re-Send Email" />
                        ) 
                           
                    )
                    
                ) : (
                    role_id === '631' ? (
                        (res[0].clusterMRC_confirm_status === "0" && res[0].groupMRC_confirm_status === "1") && <input type='button' id='alert-success' className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' onClick={do_ClusterConfirm(`${_id}`)} value='Validate cluster' />
                    ) :
                        role_id === '632' ? (
                        (res[0].groupMRC_confirm_status === "0" && res[0].areaMRC_confirm_status === "1") && <input type='button' id='alert-success' className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' onClick={do_GroupValidate(`${_id}`)} value='Validate Group' />
                    ) :
                    role_id === '633' ? (
                        (res[0].areaMRC_confirm_status === "0" && res[0].mobileMRC_confirm_status === "1") && <input type='button' id='alert-success' className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' onClick={AreaValidateEnterprise} value='Validate Area' />
                    ) :
                    role_id === '634' ? (
                        (res[0].mobileMRC_confirm_status === "0" && res[0].enterprisemgtMRC_confirm_status === "1") && <input type='button' id='alert-success' className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' onClick={MobileValidateEnterprise(`${_id}`)} value='Validate Mobile' />
                    ) :
                    role_id === '635' && (
                        (res[0].enterprisemgtMRC_confirm_status === "0") && <input type='button' id='alert-success' className='btn btn-outline-danger btn-icon m-1 float-right' name='submit' data-toggle='modal' data-target='.bd-example-modal-sm' onClick={EnterpriseMValidateEnterprise(`${_id}`)} value='Validate Enterprise' />
                    ) 
                )
           
            
            }
        </div>
    )
}

