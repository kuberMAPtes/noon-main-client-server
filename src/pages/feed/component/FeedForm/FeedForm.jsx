import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Badge } from 'react-bootstrap';
import axios_api from '../../../../lib/axios_api';
import CheckModal from '../Common/CheckModal';
import navigator from '../../util/Navigator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 달력 전용 css;
import styles from '../../css/FeedForm/FeedForm.module.css';
import buttonStyles from '../../css/common/FeedButton.module.css';
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoWarning } from 'react-icons/io5';

const FeedForm = ({ existingFeed, inputWriterId, inputBuildingId, inputFeedId, onSave }) => {
    const [feedData, setFeedData] = useState({
        writerId: inputWriterId,
        mainActivate: false,
        viewCnt: 0,
        writtenTime: '',
        modified: false,
        title: '',
        feedText: '',
        updateTagList: [],
        category: 'GENERAL',
        publicRange: 'PUBLIC',
        attachments: []
    });

    // 태그 추가 
    const [tagInput, setTagInput] = useState('');

    // 이벤트 날짜 상태
    const [eventDate, setEventDate] = useState(null);

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    // Feed Add, Update Modal 관련
    const [feedAddShow, setFeedAddShow] = useState(false);
    const [feedUpdateShow, setFeedUpdateShow] = useState(false);

    // navigator
    const { goToFeedDetail, backHistory } = navigator();

    // 첨부파일을 삭제할 파일 목록
    const [deletedFiles, setDeletedFiles] = useState([]);

    // @(memberId)를 통해 리다이렉션하기
    // const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    useEffect(() => {
        if (existingFeed) {
            setFeedData({
                writerId: existingFeed.writerId,
                mainActivate: existingFeed.mainActivate,
                viewCnt: existingFeed.viewCnt,
                writtenTime: existingFeed.writtenTime,
                modified: true,
                title: existingFeed.title,
                feedText: existingFeed.feedText,
                updateTagList: existingFeed.updateTagList || [],
                category: existingFeed.category || 'GENERAL',
                publicRange: existingFeed.publicRange || 'PUBLIC',
                attachments: existingFeed.attachments || []
            });
        } else {
            setFeedData({
                writerId: inputWriterId,
                mainActivate: false,
                viewCnt: 0,
                writtenTime: '',
                modified: false,
                title: '',
                feedText: '',
                updateTagList: [],
                category: 'GENERAL',
                publicRange: 'PUBLIC',
                attachments: []
            });
        }
    }, [existingFeed, inputWriterId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedData({
            ...feedData,
            [name]: value,
        });
    };

    // 피드 추가
    const handleAddSubmit = async () => {
        try {
            const addFeedData = {
                writerId: inputWriterId,
                buildingId: inputBuildingId,
                mainActivate: false,
                viewCnt: 0,
                writtenTime: new Date(),
                modified: false,
                title: feedData.title,
                feedText: feedData.feedText,
                updateTagList: feedData.updateTagList,
                feedCategory: feedData.category,
                publicRange: feedData.publicRange,
                eventDate: eventDate
            };

            console.log(addFeedData);

            const feedResponse = await axios_api.post('/feed/addFeed', addFeedData);

            const feedId = feedResponse.data;

            const formData = new FormData();
            feedData.attachments.forEach((file) => {
                formData.append('multipartFile', file);
            });
            
            if(formData && formData.getAll('multipartFile').length > 0) {
                await axios_api.post(`/feed/addFeedAttachment/${feedId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);

            goToFeedDetail(inputWriterId, feedId);
        } catch (error) {
            console.error('피드 저장 중 오류 발생:', error);
        }
    }

    // 피드 수정
    const handleUpdateSubmit = async () => {
        try {
            const updateFeedData = {
                feedId: inputFeedId,
                writerId: inputWriterId,
                mainActivate: feedData.mainActivate,
                viewCnt: feedData.viewCnt,
                writtenTime: feedData.writtenTime,
                modified: true,
                title: feedData.title,
                feedText: feedData.feedText,
                updateTagList: feedData.updateTagList,
                feedCategory: feedData.category,
                publicRange: feedData.publicRange,
                attachments: feedData.attachments,
                eventDate: eventDate
            };

            console.log(updateFeedData);

            const feedResponse = await axios_api.post(`/feed/updateFeed`, updateFeedData);

            const feedId = feedResponse.data;

            // 첨부파일 저장
            const formData = new FormData();
            feedData.attachments.forEach((file) => {
                if (file instanceof File) {
                    formData.append('multipartFile', file);
                }
            });

            if(formData && formData.getAll('multipartFile').length > 0) {
                await axios_api.post(`/feed/addFeedAttachment/${feedId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            // 삭제된 파일 처리
            if (deletedFiles.length > 0) {
                deletedFiles.forEach(async (deleteFile) => {
                    await axios_api.post(`/feed/deleteFeedAttachment/${deleteFile.attachmentId}`);
                });
            }

            console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);

            goToFeedDetail(inputWriterId, feedId);
        } catch (error) {
            console.error('피드 수정 중 오류 발생:', error);
        }
    }

    // 피드 추가 및 수정 제출하기
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (inputFeedId) {
                setFeedUpdateShow(true);
            } else {
                setFeedAddShow(true);
            }
        } catch (error) {
            console.error("HandleSubmit Error 발생 : " + error);
        }
    }

    // 모달 창 띄우기
    const handleModalConfirm = async () => {
        try {
            if (inputFeedId) {
                await handleUpdateSubmit();
            } else {
                await handleAddSubmit();
            }

            onSave && onSave();
            setFeedAddShow(false);
            setFeedUpdateShow(false);
        } catch (error) {
            console.error("HandleModalConfirm Error 발생 : " + error);
        }
    }

    const handleCancel = () => {
        backHistory(); // 뒤로가기
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFeedData(prevState => ({
            ...prevState,
            attachments: [...prevState.attachments, ...files]
        }));
    };

    // 미리보기 삭제 시 삭제 리스트에 포함시키기
    const handleFileRemove = (index) => {
        const file = feedData.attachments[index];

        if (isUploadedFile(file)) {
            setDeletedFiles([...deletedFiles, file]); //  사용하여 파일 식별
        }

        // 인덱스를 사용하여 파일 목록에서 해당 파일 삭제
        const updatedFiles = feedData.attachments.filter((_, i) => i !== index);

        setFeedData({ ...feedData, attachments: updatedFiles });
    };

    const isImageOrVideo = (file) => {
        if (file instanceof File) {
            const fileType = file.type.split('/')[0];
            return fileType === 'image' || fileType === 'video';
        }
        return file && (file.fileType === 'PHOTO' || file.fileType === 'VIDEO');
    };

    const isUploadedFile = (file) => {
        return file.fileUrl !== undefined; // 이미 업로드된 파일은 fileUrl이 존재할 것으로 가정
    };
    
    const handleTagAdd = () => {
        if (tagInput.trim() !== '') {
            setFeedData(prevState => ({
                ...prevState,
                updateTagList: [...prevState.updateTagList, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleTagRemove = (tagText) => {
        const updatedTags = feedData.updateTagList.filter(t => t !== tagText);
        setFeedData({ ...feedData, updateTagList: updatedTags });
    };

    return (
        <div className={styles.feedFormContainer}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="feedCategory" className="mb-3">
                    <Form.Label>카테고리</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        value={feedData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="GENERAL">일반</option>
                        <option value="COMPLIMENT">칭찬하기</option>
                        <option value="QUESTION">Q&A</option>
                        <option value="EVENT">이벤트</option>
                        <option value="SHARE">나눔</option>
                        <option value="HELP_REQUEST">도움 요청</option>
                    </Form.Control>
                </Form.Group>
                <div className={styles.noticeBox}>
                    <span className={styles.noticeBoxText}>
                        <IoWarning/> 이벤트 피드는 생성 후 수정이 되지 않습니다.
                    </span>
                </div>
                <Form.Group controlId="feedTitle" className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="제목을 입력하세요"
                        value={feedData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="feedText" className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="feedText"
                        rows={10}
                        placeholder="내용을 입력하세요"
                        value={feedData.feedText}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className={styles.noticeBox}>
                    <span className={styles.noticeBoxText}>
                        <MdTipsAndUpdates/> '@member'처럼 원하는 회원 아이디를 태그할 수 있습니다.
                    </span>
                </div>
                {/* 태그 */}
                <Form.Group controlId="feedTags" className="mb-3">
                    <Form.Control
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="태그를 입력하세요"
                        className={styles.tagInput}
                    />
                    <Button onClick={handleTagAdd} className={buttonStyles.fullWidthButton}>태그 추가</Button>
                    <div className={styles.tagList}>
                        {Array.isArray(feedData.updateTagList) && feedData.updateTagList.map((tag, index) => (
                            <Badge key={index} className={`mr-2 ${styles.tagBadge}`}>
                                {tag} <span className={styles.badgeClose} onClick={() => handleTagRemove(tag)}>×</span>
                            </Badge>
                        ))}
                    </div>
                </Form.Group>

                <Form.Group controlId="attachments" className="mb-3">
                    <Form.Control
                        type="file"
                        name="attachments"
                        multiple
                        onChange={handleFileChange}
                    />
                    <ListGroup className={styles.fileList}>
                        {feedData.attachments.map((file, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                {isUploadedFile(file) ? (
                                    <div className={styles.filePreview}>
                                        {isImageOrVideo(file) ? (
                                            file.fileUrl && (<img src={file.fileUrl} alt={file.fileUrl} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }} />)
                                        ) : (
                                            <span>{file.fileUrl}</span>
                                        )}
                                        <span>{file.fileUrl}</span>
                                    </div>
                                ) : (
                                    <div className={styles.filePreview}>
                                        {isImageOrVideo(file) ? (
                                        <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }} />
                                        ) : (
                                            <span>{file.name}</span>
                                        )}
                                        <span>{file.name}</span>
                                    </div>
                                )}
                                <Button variant="danger" size="sm" onClick={() => handleFileRemove(index)}>삭제</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form.Group>
                <div className={styles.noticeBox}>
                    <span className={styles.noticeBoxText}>
                        파일은 사진과 동영상을 여러 개 넣을 수 있습니다. <br/>
                        하나의 파일 당 최대 100MB로 제한됩니다.
                    </span>
                </div>
                {feedData.category === 'EVENT' && (
                    <Form.Group controlId="eventDate" className="mb-3">
                        <div className={styles.feedFormSubTitle}><FaRegCalendarCheck/> 특별한 날을 선택해주세요</div>
                        <div className={styles.datePickerWrapper}>
                        <DatePicker
                            selected={eventDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy/MM/dd"
                            className={`form-control ${styles.datePickerInput}`}
                        />
                        <DatePicker
                            selected={eventDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className={`form-control ${styles.datePickerInput}`}
                        />
                        </div>
                    </Form.Group>
                ) }

                

                <Form.Group controlId="feedPublicRange" className="mb-3">
                    <Form.Label>공개 범위</Form.Label>
                    <Form.Control
                        as="select"
                        name="publicRange"
                        value={feedData.publicRange}
                        onChange={handleChange}
                        required
                    >
                        <option value="PUBLIC">전체 공개</option>
                        <option value="FOLLOWER_ONLY">팔로워 공개</option>
                        <option value="MUTUAL_ONLY">맞팔 공개</option>
                        <option value="PRIVATE">비공개</option>
                    </Form.Control>
                </Form.Group>

                <Button className={buttonStyles.fullWidthButtonBlack} type="submit">
                    저장
                </Button>
                &nbsp;&nbsp;
                <Button className={buttonStyles.fullWidthButtonRed} onClick={handleCancel}>
                    취소
                </Button>
            </Form>

            {/* Modal : addFeed*/}
            <CheckModal 
                show={feedAddShow}
                onHide={()=>setFeedAddShow(false)}
                onConfirm={handleModalConfirm}
                title="피드 추가"
                content="새로운 일상을 공유할까요?"
            />

            {/* Modal : updateFeed*/}
            <CheckModal 
                show={feedUpdateShow}
                onHide={()=>setFeedUpdateShow(false)}
                onConfirm={handleModalConfirm}
                title="피드 수정"
                content="변화된 일상을 공유할까요?"
            />
        </div>
    );
};

export default FeedForm;
