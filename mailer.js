import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, text) =>{
    try{
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth :{
                user: "rihem.dsi@gmail.com",
                pass: 'kpze hkwq rxrh ooat'
            }
        });
    const info = await transport.sendMail({
        from: process.env.NODEMAILLE_USER,
        to,
        subject,
        text
    })    
    console.log(`Message sent: ${info.messageId}`);
    }catch(error){
        console.log(error);
    }
}
export default sendEmail;