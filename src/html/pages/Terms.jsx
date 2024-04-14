import { useEffect } from "react";

function Terms() {
    function ScrolltoTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    useEffect(() => {
        ScrolltoTop();
    }, []);
    return (<>
        <div className="terms-cont" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", background: "#fff" }}>
            <h3 className="term-title">Terms and Conditions</h3>
            <p className="terms">This Privacy Policy introduces to you our policies and procedures regarding the collection, use and disclosure of personal information we receive from users of the
                vrasm.com website. By using the Website you consent
                to the collection, use and disclosure of your personal information in accordance with this Policy. If you have questions or concerns regarding this policy, you should
                first contact to abc.you@gmail.com.</p>


            <p className="terms">How We Use Your Personal Data</p>

            <p className="terms">1. We may process your account data. Account data may include your name and/or login and email address. The account data may be processed
                for the purposes of providing our services, ensuring the security of our website and services and communicating with you.</p>

            <p className="terms">2. We may process your information included in your personal profile on our website. The profile data may include your real name, email addres,
                profile pictures, date of birth, address other information you provided in your profile.email will not be shown to other users of our services.</p>

            <p className="terms">3. We may also collect your non-Registration Information including the number of uploads and downloads on the Website, profile changes, content changes.
                We may collect and process the data about your use of "File Management System" service and the name of your templates.</p>
            <p className="terms">4. we may also use the personal information disclosed to us to assist you with technical difficulties you may experience while using our Website.</p>


            <p className="terms">How We Protect Your Data
                The Personal Data that you provide in connection with the use of the Website is protected in several ways:</p>

            {/* <p className="terms">1. Personal Data is encrypted whenever it is transmitted to the Website.</p> */}

            <p className="terms">1. Access by you to your account profile is available through a password and unique customer ID selected by you. You are responsible for maintaining the
                secrecy of your unique password and account information, and for controlling access to your email communications from the Website, at all times.</p>

            <p className="terms">2. Personal Data collected is retained as long as it is reasonably required for the purposes it was collected.</p>

            <p className="terms">3. Personal Data is stored in secure computer systems which protect it from unauthorized access or use.Retaining and deleting personal data
                We retain personal data for as long as necessary to fulfil the purposes for which we collect or receive the personal data, except if required otherwise
                by applicable law. Typically, we will retain most of the personal data for the duration of your use of our services, until you have removed your account.
                Note that after the deletion of your account your comments may be left on the forum service.</p>

            <p className="terms">Your rights:
                You have the following rights in relation to your personal data:

                1. To exercise these rights, please contact us using our contact details set out below. We will respond to your request within the applicable statutory term.</p>


            <p className="terms">Cookies:
                We may place small data files called cookies on your computer that hold information which allows a website to recognize your account.
                Cookies may be used irrespective of whether you register with us or not. </p>



            <p className="terms">Disclosures:
                The "profile data", except real name and email, that you choose to voluntarily provide to us is disclosed to other users of our services.</p>

            <p className="terms">
                How to Contact Us:

                If you have any comments or inquiries about the information in this Privacy Statement, if you would like us to update your personal data,
                or to exercise your rights, please contact us by email at abc.you@gmail.com.com

            </p>
        </div>
    </>);
}
export default Terms;