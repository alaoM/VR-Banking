import { create as ipfsHttpClient } from "ipfs-http-client";
import { Children, useState, useEffect } from "react";

export const Upload  = function(filesfiles) {

const projectId = '2DFi4PsjYHK0k3A8GPUWCUwkjKU';
const projectSecret = '2b71acd34dca4f77d3a798de4571f049';
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');

    const client = ipfsHttpClient({
      url: "https://ipfs.infura.io:5001",
      // url: "https://msme.infura-ipfs.io",
      protocol: 'https',
      headers: {
          authorization: auth,
      },
    });
    // https://msme.infura-ipfs.io/ipfs/QmabVxBzkoCnq7mNgczduH4vEYESe13S15LHfDdKp1s9FZ

    async function uploadToIpfs(e) {
        e.preventDefault(e)
        const file = e.target.files[0];
        let data = new FormData();
        data.append('file', file);
 
            try {
                const added = await client.add(file,
                    {
                        progress: (prog) => {
                            console.log(`received: ${prog}`);
                        },
                    });
                    const url =`https://msme.infura-ipfs.io/ipfs/${added.path}`;
                    // console.log(url)
                    return url

            } catch (error) {
                console.log("Error uploading file: ", error);
            }
    }


 
    const urll=uploadToIpfs(filesfiles)
    return urll
   
 
} 
export default Upload;