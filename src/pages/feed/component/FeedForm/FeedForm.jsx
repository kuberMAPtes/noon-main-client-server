import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, Container, Badge } from 'react-bootstrap';
import "../../css/FeedForm.css";
import axios_api from '../../../../lib/axios_api';
import CheckModal from '../Common/CheckModal';
import navigator from '../../util/Navigator';
// import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';

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

    // Feed Add, Update Modal 관련
    const [feedAddShow, setFeedAddShow] = useState(false);
    const [feedUpdateShow, setFeedUpdateShow] = useState(false);

    // navigator
    const { goToFeedDetail } = navigator();

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
                publicRange: feedData.publicRange
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
                attachments: feedData.attachments
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
        setFeedData({
            title: '',
            feedText: '',
            tags: [],
            category: 'GENERAL',
            publicRange: 'PUBLIC',
            attachments: []
        });
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
        <Container className="feed-form">
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="feedTitle" className="mb-3">
                            <Form.Label>제목</Form.Label>
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
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="feedText"
                                rows={3}
                                placeholder="내용을 입력하세요"
                                value={feedData.feedText}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="attachments" className="mb-3">
                            <Form.Label>첨부 파일</Form.Label>
                            <Form.Control
                                type="file"
                                name="attachments"
                                multiple
                                onChange={handleFileChange}
                            />
                            <ListGroup className="file-list mt-3">
                                {feedData.attachments.map((file, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        {isUploadedFile(file) ? (
                                            <div className="d-flex align-items-center">
                                                {isImageOrVideo(file) ? (
                                                    <img src={file.fileUrl} alt={file.fileUrl} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }} />
                                                ) : (
                                                    <span>{file.fileUrl}</span>
                                                )}
                                                <span>{file.fileUrl}</span>
                                            </div>
                                        ) : (
                                            <div className="d-flex align-items-center">
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

                        <Form.Group controlId="feedTags" className="mb-3">
                            <Form.Label>태그</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="태그를 입력하세요"
                                />
                                <Button className="ml-2" onClick={handleTagAdd}>추가</Button>
                            </div>
                            <div className="mt-2">
                                {Array.isArray(feedData.updateTagList) && feedData.updateTagList.map((tag, index) => (
                                    <Badge key={index} pill variant="primary" className="mr-2">
                                        {tag} <span className="badge-close" onClick={() => handleTagRemove(tag)}>×</span>
                                    </Badge>
                                ))}
                            </div>
                        </Form.Group>

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
                            </Form.Control>
                        </Form.Group>

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
                                <option value="GROUP">그룹 공개</option>
                                <option value="PRIVATE">비공개</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mr-2">
                            저장
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="secondary" onClick={handleCancel}>
                            취소
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

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
        </Container>
    );
};

export default FeedForm;
