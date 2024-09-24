import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import ErrorPage from './ErrorPage';

function UploadImg() {
    let [img, setImg] = useState('');
    let [imgs, setImgs] = useState([]);
    const host = "http://localhost:8080";
    const submitEvent = e => {
      e.preventDefault();
      const formData = new FormData();
      for(let i = 0; i < e.target.file.files.length; i++) {
        formData.append("file", e.target.file.files[i]);
      }
  
      axios.post(host+"/filesUpload", formData)
        .then(res => {
            console.log(res);
            if(res.data.state){
                alert("저장성공");
                let viewUrl = host + "/view?url=";
                let list = [];
                for(let i = 0; i < res.data.list.length; i++) {
                    list[i] = viewUrl + res.data.list[i];
                }
                setImgs(list);
            }
        })
        .catch(error => alert("파일을 선택하세요!"));
    }

    const selectEvent = () => {

        axios.get(host+"/filesRead")
            .then( res => {
                if(res.data.state) {
                    let viewUrl = host + "/view?url=";
                    // let imgUrl = res.data.url;
                    // setImg(viewUrl + imgUrl);
                    let list = [];
                    for(let i = 0; i < res.data.list.length; i++) {
                        list[i] = viewUrl + res.data.list[i];
                    }
                    setImgs(list);
                }
            })
            .catch(error => alert("에러다"));
    }


    return (
        <>
        <header>
        <h1 className="text-center">파일업로드</h1>
      </header>
            <main>
                <form onSubmit={submitEvent}>
                    <div className="input-body">
                        <label htmlFor="title">그림</label>
                        <input type="file" name="file" accept="image/*" autoComplete="off" multiple/>
                    </div>
                    <div className="input-body">
                        <input type="submit" value="전송"/>
                    </div>
                </form>
                <div className="input-body">
                    <button type="button" onClick={selectEvent}>리스트 보기</button>
                </div>
                <div className="imgs">
                    {/* {
              img === '' ?
                <></>
                :
                <img src={img} className="img" />
            } */}
                    {
                        imgs.map((row, index) => {
                            return (
                                img === null ? <ErrorPage/> : <img src={row} className="img" key={index}/>
                            );
                        })
                    }
                </div>
            </main>
        </>

    );


}

export default UploadImg;