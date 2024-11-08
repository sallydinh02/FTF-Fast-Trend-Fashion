import base64
from io import BytesIO
from pathlib import Path

from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
from pydantic import BaseModel
from starlette.requests import Request
import io

from .service import TryonService
from .utils import gdrive_download, url_download
import requests

router = APIRouter()

CKPT_PATH = Path('model')
# CKPT_PATH.mkdir(parents=True, exist_ok=True)

# gdrive_download(
#     url='https://drive.google.com/uc?id=1rbSTGKAE-MTxBYHd-51l2hMOQPT_7EPy',
#     output=str(CKPT_PATH / 'u2netp.pt'),
# )
# gdrive_download(
#     url='https://drive.google.com/uc?id=1KJNKjqBeUF9CLcCRFyjONmKzcqjNgj9z',
#     output=str(CKPT_PATH / 'mobile_warp.pt'),
# )
# gdrive_download(
#     url='https://drive.google.com/uc?id=1TP2OiEixy1WEjbJsdDYGL-214v_zkqUV',
#     output=str(CKPT_PATH / 'mobile_gen.pt'),
# )
# url_download(
#     url='https://github.com/WongKinYiu/yolov7/releases/download/v0.1/yolov7-w6-pose.pt',
#     output=str(CKPT_PATH / 'yolov7-w6-pose.pt'),
# )
# url_download(
#     url='https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite',
#     output=str(CKPT_PATH / 'mediapipe_segmenter.tflite'),
# )

tryon_service = TryonService(
    tryon_ckpt={'warp': CKPT_PATH / 'mobile_warp.pt', 'gen': CKPT_PATH / 'mobile_gen.pt'},
    edge_detect_ckpt=CKPT_PATH / 'u2netp.pt',
    yolo_ckpt=CKPT_PATH / 'yolov7-w6-pose.pt',
    mediapipe_segment_ckpt=CKPT_PATH / 'mediapipe_segmenter.tflite',
    device='cuda:0',
)

class ImageRequest(BaseModel):
    userImg: str
    clothImg: str

# MERN_BACKEND_URL="http://localhost:4000/upload"
# @router.get('/image')

# @router.post('/image')
# async def try_on_image(imageData: ImageRequest):
#     response1=requests.get(imageData.userImg)
#     if response1.status_code!=200:
#       raise HTTPException(status_code=response1.status_code, detail="User image not found")
#     pil_img = Image.open(BytesIO(response1.content)).convert('RGB')

#     response2=requests.get(imageData.clothImg)
#     if response1.status_code!=200:
#       raise HTTPException(status_code=response2.status_code, detail="Product image not found")
#     pil_clothes = Image.open(BytesIO(response2.content)).convert('RGB')
#     # pil_img = Image.open(BytesIO(person_image_content)).convert('RGB')
#     # pil_clothes = Image.open(BytesIO(cloth_image_content)).convert('RGB')

#     tryon_cv = tryon_service.tryon_image(pil_img, pil_clothes)
#     if tryon_cv is not None:
#         pil_tryon = Image.fromarray(tryon_cv)
#     else:
#         pil_tryon = pil_img

#     image_buffer = BytesIO()
#     pil_tryon.save(image_buffer, 'JPEG')
#     image_buffer.seek(0)

#     base64_string = "data:image/jpeg;base64," + base64.b64encode(image_buffer.getvalue()).decode()

#     return JSONResponse(
#         content={
#             'message': 'success',
#             'result': base64_string,
#         }
#     )

# send image bytes
@router.post('/image')
async def try_on_image(request: Request):
    form = await request.form()
    image1 = form["image1"]
    image2 = form["image2"]

    image1_bytes = await image1.read()
    image2_bytes = await image2.read()

    pil_img = Image.open(io.BytesIO(image1_bytes))
    pil_clothes = Image.open(io.BytesIO(image2_bytes))

    tryon_cv = tryon_service.tryon_image(pil_img, pil_clothes)
    if tryon_cv is not None:
        pil_tryon = Image.fromarray(tryon_cv)
    else:
        pil_tryon = pil_img

    image_buffer = BytesIO()
    pil_tryon.save(image_buffer, 'JPEG')
    image_buffer.seek(0)

    #base64_string = "data:image/jpeg;base64," + base64.b64encode(image_buffer.getvalue()).decode()

    base64_string = "data:image/jpeg;base64," + base64.b64encode(image_buffer.getvalue()).decode()
    return JSONResponse(
        content={
            'message': 'success',
            'result': base64_string,
        }
    )

# @router.post('/image')
# async def try_on_image(person_image: UploadFile, garment_image: UploadFile):
#     person_image_content = await person_image.read()
#     cloth_image_content = await garment_image.read()

#     pil_img = Image.open(BytesIO(person_image_content)).convert('RGB')
#     pil_clothes = Image.open(BytesIO(cloth_image_content)).convert('RGB')

#     tryon_cv = tryon_service.tryon_image(pil_img, pil_clothes)
#     if tryon_cv is not None:
#         pil_tryon = Image.fromarray(tryon_cv)
#     else:
#         pil_tryon = pil_img

#     image_buffer = BytesIO()
#     pil_tryon.save(image_buffer, 'JPEG')
#     image_buffer.seek(0)

#     base64_string = "data:image/jpeg;base64," + base64.b64encode(image_buffer.getvalue()).decode()

#     return JSONResponse(
#         content={
#             'message': 'success',
#             'result': base64_string,
#         }
#     )
