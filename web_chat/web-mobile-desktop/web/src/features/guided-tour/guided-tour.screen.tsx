import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';
import './guided-tour.scss';
import { IconCelebrationRafiki, IconDeleteDisabled, IconSetupWizard } from '../../libraries/Icons/icon.screen';

const eleFirstStep = (
  <div className="guidedtour-stepincenter">
    <IconSetupWizard></IconSetupWizard>
    <p className="subheading-regular">Khám phá mạng xã hội nội bộ trong 1 phút</p>
    <p className="body-bold">Chúng tôi sẽ giới thiệu cho bạn những tính năng cơ bản</p>
  </div>
)

const step1 = (
  <div>
    <p className="body-bold">1/6</p>
    <p className="body-bold">Mở menu các tính năng của iHCM</p>
  </div>
)

const step2 = (
  <div>
    <p className="body-bold">2/6</p>
    <p className="body-bold">Thanh menu điều hướng :</p>
    <p className="body-bold">- Tin nhắn</p>
    <p className="body-bold">- Thành viên</p>
    <p className="body-bold">- Bảng tin mạng xã hội</p>
    <p className="body-bold">- Thông báo</p>
  </div>
)

const step3 = (
  <div>
    <p className="body-bold">3/6</p>
    <p className="body-bold">Danh sách tất cả các cuộc trò chuyện và nhóm trò chuyện</p>
  </div>
)

const step4 = (
  <div>
    <p className="body-bold">4/6</p>
    <p className="body-bold">Tạo cuộc trò chuyện hoặc nhón trò chuyện mới</p>
  </div>
)

const step5 = (
  <div>
    <p className="body-bold">5/6</p>
    <p className="body-bold">Tìm kiếm các cuộc trò chuyện</p>
  </div>
)

const step6 = (
  <div>
    <p className="body-bold">6/6</p>
    <p className="body-bold">Vùng hiện thị chi tiết nội dung của cuộc trò chuyện</p>
  </div>
)

const eleLastStep = (
  <div className="guidedtour-stepincenter">
    <IconCelebrationRafiki></IconCelebrationRafiki>
    <p className="subheading-regular">Hoàn thành hướng dẫn</p>
    <p className="body-bold">Chúng mừng bạn đã hoàn thành những thao tác đàu tiên. Xin cám ơn!</p>
  </div>
)

const steps: any[] = [
  {
    content: eleFirstStep,
    placement: 'center',
    target: 'body',
    disableOverlayClose: false,
  },
  {
    content: step1,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    target: '.step1',
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    placement: 'bottom-end',
  },
  {
    content: step2,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    target: '.step2',
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    placement: 'auto',
  },
  {
    content: step3,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    target: '.step3',
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    placement: 'auto',
  },
  {
    content: step4,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    target: '.step4',
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    placement: 'auto',
  },
  {
    content: step5,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    target: '.step5',
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    placement: 'auto',
  },
  {
    content: step6,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 10,
    target: '.step6',
    disableBeacon: true,
    disableOverlayClose: true,
    spotlightClicks: true,
    // placement: 'auto',
  },
  {
    content: eleLastStep,
    placement: 'center',
    target: 'body',
    disableOverlayClose: false,
  },
];

const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  skipProps,
  primaryProps,
  tooltipProps,
}: any ) =>{ 
  return (
  <div {...tooltipProps} className="guidedtour-container padding-20">
    <div className="padding-20">
      { step.content }
    </div>

    { (index > 0 && index < steps.length - 1) && (
      <>
        <div className="guidedtour-closebutton">
          <IconDeleteDisabled {...skipProps}></IconDeleteDisabled>
        </div>

        <div className="guidedtour-buttonfield">
          <button {...backProps} className="btn-outline margin-right-16">Quay lại</button>
          <button {...primaryProps}>Tiếp tục</button>
        </div>
      </>
    )}

    { index === steps.length - 1 && (
      <div className="guidedtour-buttonfield">
        <button {...skipProps}  className="btn-outline">Đóng</button>

      </div>

    )}

    { index === 0 && (
      <div className="guidedtour-buttonfield">
        <button {...skipProps}  className="btn-outline margin-right-16">Bỏ qua</button>
        <button {...primaryProps}>Bắt đầu</button>
      </div>
    )}
  </div>
)};

function GuidedTourScreen() {
  // state
  const [isDisplayed , setIsDisplayed] = useState<boolean>(true);

  useEffect(() => {
    const g_tour =  localStorage.getItem('g_tour');
    if(g_tour){
      setIsDisplayed(false)
    } else{
      localStorage.setItem('g_tour', "123");
    }
  })
  
  return (
    <Joyride
      continuous={ true }
      run={ isDisplayed }
      scrollToFirstStep={ false }
      disableCloseOnEsc={ false }
      showProgress={ false }
      showSkipButton={ true }
      steps={ steps }
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
      tooltipComponent={ Tooltip }
    />
  );
}

export default GuidedTourScreen;



