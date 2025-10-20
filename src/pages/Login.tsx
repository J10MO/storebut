// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';

// interface LoginProps {
//   showCloseButton?: boolean;
//   onClose?: () => void;
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth();
//   const { transferGuestCartToUser } = useCart();
//   const navigate = useNavigate();
//   const [phone, setPhone] = React.useState('');
//   const [code, setCode] = React.useState('');
//   const [step, setStep] = React.useState<'phone' | 'verify'>('phone');
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState<string | null>(null);

//   const handleSendOTP = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('Sending OTP to:', phone);
//       const result = await sendOTP(phone);
//       console.log('OTP result:', result);
      
//       if (result.success) {
//         setStep('verify');
//         // Show OTP in alert for testing (remove in production)
//         alert(`OTP sent! Use code: ${result.data?.debugOtp || 'Check server console'}`);
//       } else {
//         setError(result.error || 'Failed to send OTP');
//       }
//     } catch (err: any) {
//       console.error('Send OTP error:', err);
//       setError('An error occurred while sending OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('Verifying OTP:', { phone, code });
//       const result = await login(phone, code, {
//         name: 'User', // You can make this dynamic with a form
//         email: `${phone}@example.com`
//       });
//       console.log('Login result:', result);
      
//       if (result.success) {
//         // Transfer guest cart to user cart
//         await transferGuestCartToUser();
        
//         if (onClose) {
//           onClose();
//         } else {
//           navigate('/');
//         }
//       } else {
//         setError(result.error || 'Verification failed');
//       }
//     } catch (err: any) {
//       console.error('Verify error:', err);
//       setError('An error occurred during verification');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
//         {showCloseButton && (
//           <button 
//             onClick={handleBackToHome}
//             className="float-right text-gray-500 hover:text-gray-700 text-xl font-bold"
//           >
//             ×
//           </button>
//         )}
        
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {step === 'phone' ? 'Login / Register' : 'Verify OTP'}
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         {step === 'phone' ? (
//           <div>
//             <p className="text-gray-600 mb-4 text-center">
//               Enter your phone number to continue
//             </p>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your phone number"
//               className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             />
//             <button
//               onClick={handleSendOTP}
//               disabled={loading || !phone.trim()}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
//             >
//               {loading ? 'Sending OTP...' : 'Continue'}
//             </button>
//           </div>
//         ) : (
//           <div>
//             <p className="text-gray-600 mb-4 text-center">
//               Enter the OTP sent to <strong>{phone}</strong>
//             </p>
//             <input
//               type="text"
//               value={code}
//               onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
//               placeholder="Enter 6-digit OTP"
//               className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono"
//               maxLength={6}
//               disabled={loading}
//             />
//             <button
//               onClick={handleVerify}
//               disabled={loading || code.length !== 4}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
//             >
//               {loading ? 'Verifying...' : 'Verify & Continue'}
//             </button>
            
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => {
//                   setStep('phone');
//                   setError(null);
//                 }}
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//                 disabled={loading}
//               >
//                 ← Change number
//               </button>
//               <button
//                 onClick={handleSendOTP}
//                 className="text-blue-600 hover:text-blue-700 font-medium"
//                 disabled={loading}
//               >
//                 Resend OTP
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Demo Info */}
//         <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <p className="text-yellow-800 text-sm text-center">
//             <strong>Demo:</strong> OTP will be shown in alert and server console
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;









// // pages/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Loader2, Phone, Lock, ArrowRight, Home } from 'lucide-react';

// interface LoginProps {
//   showCloseButton?: boolean;
//   onClose?: () => void;
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth();
//   const { transferGuestCartToUser } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [name, setName] = useState('');
//   const [step, setStep] = useState<'phone' | 'verify'>('phone');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSendOTP = async () => {
//     if (!phone.trim()) {
//       setError('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('إرسال رمز التحقق إلى:', phone);
//       const result = await sendOTP(phone);
//       console.log('نتيجة إرسال الرمز:', result);
      
//       if (result.success) {
//         setStep('verify');
//         // عرض رمز التحقق للاختبار (احذف في الإنتاج)
//         if (result.data?.debugOtp) {
//           alert(`تم إرسال رمز التحقق! استخدم الرمز: ${result.data.debugOtp}`);
//         }
//       } else {
//         setError(result.error || 'فشل في إرسال رمز التحقق');
//       }
//     } catch (err: any) {
//       console.error('خطأ في إرسال الرمز:', err);
//       setError('حدث خطأ أثناء إرسال رمز التحقق');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     if (!code.trim()) {
//       setError('الرجاء إدخال رمز التحقق');
//       return;
//     }

//     if (!name.trim()) {
//       setError('الرجاء إدخال اسمك');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('التحقق من الرمز:', { phone, code });
//       const result = await login(phone, code, {
//         name: name,
//         email: `${phone}@example.com`
//       });
//       console.log('نتيجة تسجيل الدخول:', result);
      
//       if (result.success) {
//         // نقل سلة الضيف إلى حساب المستخدم
//         await transferGuestCartToUser();
        
//         // إذا كان المستخدم قادم من صفحة الدفع، أعده إليها
//         const from = (location.state as any)?.from || '/';
        
//         if (onClose) {
//           onClose();
//         } else {
//           navigate(from, { replace: true });
//         }
//       } else {
//         setError(result.error || 'فشل التحقق من الرمز');
//       }
//     } catch (err: any) {
//       console.error('خطأ في التحقق:', err);
//             setError('حدث خطأ أثناء التحقق من الرمز');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleBack = () => {
//     setStep('phone');
//     setCode('');
//     setError(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
//       <Card className="max-w-md w-full">
//         <CardHeader className="space-y-1">
//           {showCloseButton && (
//             <Button 
//               variant="ghost"
//               size="icon"
//               onClick={handleBackToHome}
//               className="absolute left-4 top-4"
//             >
//               <Home className="w-5 h-5" />
//             </Button>
//           )}
          
//           <CardTitle className="text-2xl font-bold text-center">
//             {step === 'phone' ? 'تسجيل الدخول / إنشاء حساب' : 'التحقق من الرمز'}
//           </CardTitle>
//           <CardDescription className="text-center">
//             {step === 'phone' 
//               ? 'أدخل رقم هاتفك للمتابعة' 
//               : 'أدخل رمز التحقق المرسل إلى هاتفك'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {/* رسالة خطأ */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-right">
//               {error}
//             </div>
//           )}

//           {step === 'phone' ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   رقم الهاتف
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="07XX XXX XXXX"
//                     className="pr-10 text-right"
//                     disabled={loading}
//                     dir="ltr"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-right">
//                   سنرسل لك رمز التحقق عبر الرسائل النصية
//                 </p>
//               </div>

//               <Button
//                 onClick={handleSendOTP}
//                 disabled={loading || !phone.trim()}
//                 className="w-full"
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                     جاري الإرسال...
//                   </>
//                 ) : (
//                   <>
//                     متابعة
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   رمز التحقق
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                                   <Input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     placeholder="أدخل رمز التحقق"
//                     className="pr-10 text-center tracking-widest text-lg"
//                     disabled={loading}
//                     maxLength={6}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   الاسم
//                 </label>
//                 <Input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="أدخل اسمك الكامل"
//                   className="text-right"
//                   disabled={loading}
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleBack}
//                   disabled={loading}
//                   className="flex-1"
//                 >
//                   رجوع
//                 </Button>
//                 <Button
//                   onClick={handleVerify}
//                   disabled={loading || !code.trim() || !name.trim()}
//                   className="flex-1"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       جاري التحقق...
//                     </>
//                   ) : (
//                     'تحقق'
//                   )}
//                 </Button>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSendOTP}
//                   disabled={loading}
//                   className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
//                 >
//                   لم يصلك الرمز؟ إعادة إرسال
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* معلومات إضافية */}
//           <div className="pt-4 border-t">
//             <p className="text-xs text-gray-500 text-center">
//               بالمتابعة، أنت توافق على{' '}
//               <a href="/terms" className="text-blue-600 hover:underline">
//                 الشروط والأحكام
//               </a>
//               {' '}و{' '}
//               <a href="/privacy" className="text-blue-600 hover:underline">
//                 سياسة الخصوصية
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;



// // pages/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Loader2, Phone, Lock, ArrowRight, Home, User } from 'lucide-react';

// interface LoginProps {
//   showCloseButton?: boolean;
//   onClose?: () => void;
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth();
//   const { transferGuestCartToUser } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [step, setStep] = useState<'phone' | 'verify'>('phone');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSendOTP = async () => {
//     if (!phone.trim()) {
//       setError('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     // تحقق من صحة رقم الهاتف
//     const phoneRegex = /^07[0-9]{8}$/;
//     if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
//       setError('رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 10 أرقام');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('إرسال رمز التحقق إلى:', phone);
//       const result = await sendOTP(phone);
//       console.log('نتيجة إرسال الرمز:', result);
      
//       if (result.success) {
//         setStep('verify');
//         // عرض رمز التحقق للاختبار (احذف في الإنتاج)
//         if (result.data?.debugOtp) {
//           console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
//           // يمكنك إظهار هذا في console فقط بدلاً من alert
//         }
//       } else {
//         setError(result.error || 'فشل في إرسال رمز التحقق');
//       }
//     } catch (err: any) {
//       console.error('خطأ في إرسال الرمز:', err);
//       setError('حدث خطأ أثناء إرسال رمز التحقق');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     if (!code.trim()) {
//       setError('الرجاء إدخال رمز التحقق');
//       return;
//     }

//     if (!name.trim()) {
//       setError('الرجاء إدخال اسمك');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('التحقق من الرمز:', { phone, code, name, email });
      
//       // إعداد بيانات المستخدم
//       const userData = {
//         name: name.trim(),
//         email: email.trim() || `${phone}@example.com`, // استخدام البريد الإلكتروني المقدم أو إنشاء واحد افتراضي
//         address: {
//           street: "",
//           city: "",
//           district: "",
//           postalCode: ""
//         }
//       };

//       const result = await login(phone, code, userData);
//       console.log('نتيجة تسجيل الدخول:', result);
      
//       if (result.success) {
//         // نقل سلة الضيف إلى حساب المستخدم
//         await transferGuestCartToUser();
        
//         // إعادة التوجيه إلى الصفحة السابقة أو الصفحة الرئيسية
//         const from = (location.state as any)?.from?.pathname || '/';
        
//         if (onClose) {
//           onClose();
//         } else {
//           navigate(from, { replace: true });
//         }
//       } else {
//         setError(result.error || 'فشل التحقق من الرمز. تأكد من صحة الرمز المدخل');
//       }
//     } catch (err: any) {
//       console.error('خطأ في التحقق:', err);
//       setError('حدث خطأ أثناء التحقق من الرمز');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleBack = () => {
//     setStep('phone');
//     setCode('');
//     setName('');
//     setEmail('');
//     setError(null);
//   };

//   const formatPhoneNumber = (value: string) => {
//     // إزالة جميع الأحرف غير الرقمية
//     const numbers = value.replace(/\D/g, '');
    
//     // التأكد من أن الرقم يبدأ بـ 07
//     let formatted = numbers;
//     if (numbers.startsWith('07') && numbers.length > 2) {
//       formatted = `07${numbers.slice(2, 10)}`; // الحد إلى 10 أرقام
//     }
    
//     // إضافة مسافات للقراءة: 07XX XXX XXXX
//     if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/, '$1 $2 $3 $4');
//     }
    
//     return formatted;
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     setPhone(formatted);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
//       <Card className="max-w-md w-full">
//         <CardHeader className="space-y-1 relative">
//           {showCloseButton && (
//             <Button 
//               variant="ghost"
//               size="icon"
//               onClick={handleBackToHome}
//               className="absolute left-4 top-4"
//             >
//               <Home className="w-5 h-5" />
//             </Button>
//           )}
          
//           <CardTitle className="text-2xl font-bold text-center">
//             {step === 'phone' ? 'تسجيل الدخول / إنشاء حساب' : 'إكمال التسجيل'}
//           </CardTitle>
//           <CardDescription className="text-center">
//             {step === 'phone' 
//               ? 'أدخل رقم هاتفك للمتابعة' 
//               : 'أدخل رمز التحقق ومعلوماتك الشخصية'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {/* رسالة خطأ */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-right text-sm">
//               {error}
//             </div>
//           )}

//           {step === 'phone' ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رقم الهاتف
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                     placeholder="07XX XXX XXXX"
//                     className="pr-10 text-right text-lg"
//                     disabled={loading}
//                     dir="ltr"
//                     maxLength={13} // 07XX XXX XXXX
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-right">
//                   سنرسل لك رمز التحقق عبر الرسائل النصية
//                 </p>
//               </div>

//               <Button
//                 onClick={handleSendOTP}
//                 disabled={loading || phone.replace(/\s/g, '').length !== 10}
//                 className="w-full"
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                     جاري الإرسال...
//                   </>
//                 ) : (
//                   <>
//                     متابعة
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رمز التحقق
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
//                     placeholder="أدخل رمز التحقق المكون من 4 أرقام"
//                     className="pr-10 text-center tracking-widest text-lg font-mono"
//                     disabled={loading}
//                     maxLength={4}
//                     dir="ltr"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   الاسم الكامل *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="أدخل اسمك الكامل"
//                     className="pr-10 text-right"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   البريد الإلكتروني (اختياري)
//                 </label>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="example@email.com"
//                   className="text-right"
//                   disabled={loading}
//                   dir="ltr"
//                 />
//                 <p className="text-xs text-gray-500 mt-2 text-right">
//                   إذا لم تدخل بريدًا إلكترونيًا، سيتم إنشاء واحد افتراضي لك
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleBack}
//                   disabled={loading}
//                   className="flex-1"
//                 >
//                   رجوع
//                 </Button>
//                 <Button
//                   onClick={handleVerify}
//                   disabled={loading || !code.trim() || !name.trim() || code.length !== 4}
//                   className="flex-1"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       جاري التحقق...
//                     </>
//                   ) : (
//                     'إنشاء الحساب / تسجيل الدخول'
//                   )}
//                 </Button>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSendOTP}
//                   disabled={loading}
//                   className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
//                 >
//                   لم يصلك الرمز؟ إعادة إرسال
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* معلومات إضافية */}
//           <div className="pt-4 border-t">
//             <p className="text-xs text-gray-500 text-center">
//               بالمتابعة، أنت توافق على{' '}
//               <a href="/terms" className="text-blue-600 hover:underline">
//                 الشروط والأحكام
//               </a>
//               {' '}و{' '}
//               <a href="/privacy" className="text-blue-600 hover:underline">
//                 سياسة الخصوصية
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;




// // pages/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Loader2, Phone, Lock, ArrowRight, Home, User, MapPin, Navigation } from 'lucide-react';

// interface LoginProps {
//   showCloseButton?: boolean;
//   onClose?: () => void;
// }

// interface AddressForm {
//   governorate: string;
//   district: string;
//   area: string;
//   street: string;
//   landmark: string;
//   postalCode: string;
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth();
//   const { transferGuestCartToUser } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [step, setStep] = useState<'phone' | 'verify'>('phone');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // حالة العنوان
//   const [address, setAddress] = useState<AddressForm>({
//     governorate: '',
//     district: '',
//     area: '',
//     street: '',
//     landmark: '',
//     postalCode: ''
//   });

//   // قائمة المحافظات والمناطق (يمكن استبدالها ببيانات حقيقية من API)
//   const governorates = [
//     'بغداد', 'البصرة', 'نينوى', 'أربيل', 'الأنبار', 'كربلاء', 
//     'بابل', 'صلاح الدين', 'ذي قار', 'واسط', 'ميسان', 'القادسية',
//     'المثنى', 'دهوك', 'السليمانية'
//   ];

//   const handleAddressChange = (field: keyof AddressForm, value: string) => {
//     setAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSendOTP = async () => {
//     if (!phone.trim()) {
//       setError('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     // تحقق من صحة رقم الهاتف
//     const phoneRegex = /^07[0-9]{8}$/;
//     if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
//       setError('رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 10 أرقام');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('إرسال رمز التحقق إلى:', phone);
//       const result = await sendOTP(phone);
//       console.log('نتيجة إرسال الرمز:', result);
      
//       if (result.success) {
//         setStep('verify');
//         // عرض رمز التحقق للاختبار
//         if (result.data?.debugOtp) {
//           console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
//         }
//       } else {
//         setError(result.error || 'فشل في إرسال رمز التحقق');
//       }
//     } catch (err: any) {
//       console.error('خطأ في إرسال الرمز:', err);
//       setError('حدث خطأ أثناء إرسال رمز التحقق');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     if (!code.trim()) {
//       setError('الرجاء إدخال رمز التحقق');
//       return;
//     }

//     if (!name.trim()) {
//       setError('الرجاء إدخال اسمك');
//       return;
//     }

//     // التحقق من العنوان للمستخدمين الجدد
//     if (!address.governorate || !address.district || !address.area || !address.street) {
//       setError('الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، الحي، والشارع)');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('التحقق من الرمز وإنشاء الحساب:', { phone, code, name, address });
      
//       // إعداد بيانات المستخدم مع العنوان
//       const userData = {
//         name: name.trim(),
//         email: email.trim() || `${phone}@example.com`,
//         address: {
//           street: address.street,
//           city: address.governorate, // استخدام المحافظة كمدينة
//           district: address.district,
//           area: address.area,
//           landmark: address.landmark,
//           postalCode: address.postalCode || "00000"
//         }
//       };

//       const result = await login(phone, code, userData);
//       console.log('نتيجة تسجيل الدخول:', result);
      
//       if (result.success) {
//         // نقل سلة الضيف إلى حساب المستخدم
//         await transferGuestCartToUser();
        
//         // إعادة التوجيه إلى الصفحة السابقة أو الصفحة الرئيسية
//         const from = (location.state as any)?.from?.pathname || '/';
        
//         if (onClose) {
//           onClose();
//         } else {
//           navigate(from, { replace: true });
//         }
//       } else {
//         setError(result.error || 'فشل التحقق من الرمز. تأكد من صحة الرمز المدخل');
//       }
//     } catch (err: any) {
//       console.error('خطأ في التحقق:', err);
//       setError('حدث خطأ أثناء التحقق من الرمز');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleBack = () => {
//     setStep('phone');
//     setCode('');
//     setName('');
//     setEmail('');
//     setAddress({
//       governorate: '',
//       district: '',
//       area: '',
//       street: '',
//       landmark: '',
//       postalCode: ''
//     });
//     setError(null);
//   };

//   const formatPhoneNumber = (value: string) => {
//     const numbers = value.replace(/\D/g, '');
//     let formatted = numbers;
//     if (numbers.startsWith('07') && numbers.length > 2) {
//       formatted = `07${numbers.slice(2, 10)}`;
//     }
//     if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/, '$1 $2 $3 $4');
//     }
//     return formatted;
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     setPhone(formatted);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
//       <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <CardHeader className="space-y-1 relative sticky top-0 bg-white z-10">
//           {showCloseButton && (
//             <Button 
//               variant="ghost"
//               size="icon"
//               onClick={handleBackToHome}
//               className="absolute left-4 top-4"
//             >
//               <Home className="w-5 h-5" />
//             </Button>
//           )}
          
//           <CardTitle className="text-2xl font-bold text-center">
//             {step === 'phone' ? 'تسجيل الدخول / إنشاء حساب' : 'إكمال التسجيل'}
//           </CardTitle>
//           <CardDescription className="text-center">
//             {step === 'phone' 
//               ? 'أدخل رقم هاتفك للمتابعة' 
//               : 'أدخل رمز التحقق ومعلوماتك الشخصية والعنوان'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {/* رسالة خطأ */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-right text-sm">
//               {error}
//             </div>
//           )}

//           {step === 'phone' ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رقم الهاتف
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                     placeholder="07XX XXX XXXX"
//                     className="pr-10 text-right text-lg"
//                     disabled={loading}
//                     dir="ltr"
//                     maxLength={13}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-right">
//                   سنرسل لك رمز التحقق عبر الرسائل النصية
//                 </p>
//               </div>

//               <Button
//                 onClick={handleSendOTP}
//                 disabled={loading || phone.replace(/\s/g, '').length !== 10}
//                 className="w-full"
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                     جاري الإرسال...
//                   </>
//                 ) : (
//                   <>
//                     متابعة
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* رمز التحقق */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رمز التحقق *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
//                     placeholder="أدخل رمز التحقق المكون من 4 أرقام"
//                     className="pr-10 text-center tracking-widest text-lg font-mono"
//                     disabled={loading}
//                     maxLength={4}
//                     dir="ltr"
//                   />
//                 </div>
//               </div>

//               {/* المعلومات الشخصية */}
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold text-right border-b pb-2">
//                   المعلومات الشخصية
//                 </h3>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     الاسم الكامل *
//                   </label>
//                   <div className="relative">
//                     <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       placeholder="أدخل اسمك الكامل"
//                       className="pr-10 text-right"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     البريد الإلكتروني (اختياري)
//                   </label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="example@email.com"
//                     className="text-right"
//                     disabled={loading}
//                     dir="ltr"
//                   />
//                 </div>
//               </div>

//               {/* العنوان */}
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold text-right border-b pb-2 flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   العنوان
//                 </h3>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     المحافظة *
//                   </label>
//                   <select
//                     value={address.governorate}
//                     onChange={(e) => handleAddressChange('governorate', e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
//                     disabled={loading}
//                   >
//                     <option value="">اختر المحافظة</option>
//                     {governorates.map(gov => (
//                       <option key={gov} value={gov}>{gov}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       المنطقة / القضاء *
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.district}
//                       onChange={(e) => handleAddressChange('district', e.target.value)}
//                       placeholder="المنطقة"
//                       className="text-right"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       الحي / المنطقة *
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.area}
//                       onChange={(e) => handleAddressChange('area', e.target.value)}
//                       placeholder="الحي"
//                       className="text-right"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     الشارع والتفاصيل *
//                   </label>
//                   <div className="relative">
//                     <Navigation className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
//                     <textarea
//                       value={address.street}
//                       onChange={(e) => handleAddressChange('street', e.target.value)}
//                       placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
//                       className="w-full p-2 border border-gray-300 rounded-lg text-right pr-10 min-h-[80px] resize-none"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       أقرب نقطة دالة
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.landmark}
//                       onChange={(e) => handleAddressChange('landmark', e.target.value)}
//                       placeholder="مقابل، بجانب..."
//                       className="text-right"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       الرمز البريدي
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.postalCode}
//                       onChange={(e) => handleAddressChange('postalCode', e.target.value.replace(/\D/g, ''))}
//                       placeholder="الرمز البريدي"
//                       className="text-right"
//                       disabled={loading}
//                       dir="ltr"
//                       maxLength={5}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* أزرار التحكم */}
//               <div className="flex gap-2 pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={handleBack}
//                   disabled={loading}
//                   className="flex-1"
//                 >
//                   رجوع
//                 </Button>
//                 <Button
//                   onClick={handleVerify}
//                   disabled={loading || !code.trim() || !name.trim() || code.length !== 4 || !address.governorate || !address.district || !address.area || !address.street}
//                   className="flex-1"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       جاري إنشاء الحساب...
//                     </>
//                   ) : (
//                     'إنشاء الحساب'
//                   )}
//                 </Button>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSendOTP}
//                   disabled={loading}
//                   className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
//                 >
//                   لم يصلك الرمز؟ إعادة إرسال
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* معلومات إضافية */}
//           <div className="pt-4 border-t">
//             <p className="text-xs text-gray-500 text-center">
//               بالمتابعة، أنت توافق على{' '}
//               <a href="/terms" className="text-blue-600 hover:underline">
//                 الشروط والأحكام
//               </a>
//               {' '}و{' '}
//               <a href="/privacy" className="text-blue-600 hover:underline">
//                 سياسة الخصوصية
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;




// // pages/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Loader2, Phone, Lock, ArrowRight, Home, User, MapPin, Navigation } from 'lucide-react';

// interface LoginProps {
//   showCloseButton?: boolean;
//   onClose?: () => void;
// }

// interface AddressForm {
//   governorate: string;
//   district: string;
//   area: string;
//   street: string;
//   landmark: string;
//   postalCode: string;
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth();
//   const { transferGuestCartToUser } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [step, setStep] = useState<'phone' | 'verify'>('phone');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // حالة العنوان
//   const [address, setAddress] = useState<AddressForm>({
//     governorate: '',
//     district: '',
//     area: '',
//     street: '',
//     landmark: '',
//     postalCode: ''
//   });

//   // قائمة المحافظات والمناطق (يمكن استبدالها ببيانات حقيقية من API)
//   const governorates = [
//     'بغداد', 'البصرة', 'نينوى', 'أربيل', 'الأنبار', 'كربلاء', 
//     'بابل', 'صلاح الدين', 'ذي قار', 'واسط', 'ميسان', 'القادسية',
//     'المثنى', 'دهوك', 'السليمانية'
//   ];

//   const handleAddressChange = (field: keyof AddressForm, value: string) => {
//     setAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSendOTP = async () => {
//     if (!phone.trim()) {
//       setError('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     // تحقق من صحة رقم الهاتف (11 رقماً يبدأ بـ 07)
//     const phoneRegex = /^07[0-9]{9}$/;
//     const cleanPhone = phone.replace(/\s/g, '');
    
//     if (!phoneRegex.test(cleanPhone)) {
//       setError('رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 11 رقماً');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('إرسال رمز التحقق إلى:', cleanPhone);
//       const result = await sendOTP(cleanPhone);
//       console.log('نتيجة إرسال الرمز:', result);
      
//       if (result.success) {
//         setStep('verify');
//         // عرض رمز التحقق للاختبار
//         if (result.data?.debugOtp) {
//           console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
//           // يمكنك عرض هذا للمستخدم في وضع التطوير
//           alert(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
//         }
//       } else {
//         setError(result.error || 'فشل في إرسال رمز التحقق');
//       }
//     } catch (err: any) {
//       console.error('خطأ في إرسال الرمز:', err);
//       setError('حدث خطأ أثناء إرسال رمز التحقق');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     if (!code.trim()) {
//       setError('الرجاء إدخال رمز التحقق');
//       return;
//     }

//     if (!name.trim()) {
//       setError('الرجاء إدخال اسمك');
//       return;
//     }

//     // التحقق من العنوان للمستخدمين الجدد
//     if (!address.governorate || !address.district || !address.area || !address.street) {
//       setError('الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، الحي، والشارع)');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const cleanPhone = phone.replace(/\s/g, '');
//       console.log('التحقق من الرمز وإنشاء الحساب:', { phone: cleanPhone, code, name, address });
      
//       // إعداد بيانات المستخدم مع العنوان حسب هيكل API
//       const userData = {
//         name: name.trim(),
//         email: email.trim() || `${cleanPhone}@example.com`,
//         address: {
//           street: address.street,
//           city: address.governorate, // استخدام المحافظة كمدينة
//           district: address.district,
//           area: address.area,
//           landmark: address.landmark,
//           postalCode: address.postalCode || "00000"
//         }
//       };

//       const result = await login(cleanPhone, code, userData);
//       console.log('نتيجة تسجيل الدخول:', result);
      
//       if (result.success) {
//         // نقل سلة الضيف إلى حساب المستخدم
//         await transferGuestCartToUser();
        
//         // إعادة التوجيه إلى الصفحة السابقة أو الصفحة الرئيسية
//         const from = (location.state as any)?.from?.pathname || '/';
        
//         if (onClose) {
//           onClose();
//         } else {
//           navigate(from, { replace: true });
//         }
//       } else {
//         setError(result.error || 'فشل التحقق من الرمز. تأكد من صحة الرمز المدخل');
//       }
//     } catch (err: any) {
//       console.error('خطأ في التحقق:', err);
//       setError('حدث خطأ أثناء التحقق من الرمز');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleBack = () => {
//     setStep('phone');
//     setCode('');
//     setName('');
//     setEmail('');
//     setAddress({
//       governorate: '',
//       district: '',
//       area: '',
//       street: '',
//       landmark: '',
//       postalCode: ''
//     });
//     setError(null);
//   };

//   const formatPhoneNumber = (value: string) => {
//     // إزالة جميع الأحرف غير الرقمية
//     const numbers = value.replace(/\D/g, '');
    
//     // التأكد من أن الرقم يبدأ بـ 07 والحد الأقصى 11 رقماً
//     let formatted = numbers;
//     if (numbers.startsWith('07') && numbers.length > 2) {
//       formatted = `07${numbers.slice(2, 11)}`; // الحد إلى 11 رقماً
//     }
    
//     // إضافة مسافات للقراءة: 07X XXX XXX XXX
//     if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
//     } else if (formatted.length > 5) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1 $2 $3');
//     } else if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{0,3})/, '$1 $2');
//     }
    
//     return formatted;
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     setPhone(formatted);
//   };

//   // التحقق من اكتمال رقم الهاتف (11 رقماً بعد إزالة المسافات)
//   const isPhoneValid = phone.replace(/\s/g, '').length === 11;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
//       <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <CardHeader className="space-y-1 relative sticky top-0 bg-white z-10">
//           {showCloseButton && (
//             <Button 
//               variant="ghost"
//               size="icon"
//               onClick={handleBackToHome}
//               className="absolute left-4 top-4"
//             >
//               <Home className="w-5 h-5" />
//             </Button>
//           )}
          
//           <CardTitle className="text-2xl font-bold text-center">
//             {step === 'phone' ? 'تسجيل الدخول / إنشاء حساب' : 'إكمال التسجيل'}
//           </CardTitle>
//           <CardDescription className="text-center">
//             {step === 'phone' 
//               ? 'أدخل رقم هاتفك للمتابعة' 
//               : 'أدخل رمز التحقق ومعلوماتك الشخصية والعنوان'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {/* رسالة خطأ */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-right text-sm">
//               {error}
//             </div>
//           )}

//           {step === 'phone' ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رقم الهاتف
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                     placeholder="07X XXX XXX XXX"
//                     className="pr-10 text-right text-lg"
//                     disabled={loading}
//                     dir="ltr"
//                     maxLength={14} // 07X XXX XXX XXX (مع المسافات)
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-right">
//                   {phone ? `${11 - phone.replace(/\s/g, '').length} أرقام متبقية` : 'أدخل 11 رقماً يبدأ بـ 07'}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1 text-right">
//                   مثال: 0771 777 7777
//                 </p>
//               </div>

//               <Button
//                 onClick={handleSendOTP}
//                 disabled={loading || !isPhoneValid}
//                 className="w-full"
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                     جاري الإرسال...
//                   </>
//                 ) : (
//                   <>
//                     متابعة
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* رمز التحقق */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رمز التحقق *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
//                     placeholder="أدخل رمز التحقق المكون من 4 أرقام"
//                     className="pr-10 text-center tracking-widest text-lg font-mono"
//                     disabled={loading}
//                     maxLength={4}
//                     dir="ltr"
//                   />
//                 </div>
//               </div>

//               {/* المعلومات الشخصية */}
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold text-right border-b pb-2">
//                   المعلومات الشخصية
//                 </h3>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     الاسم الكامل *
//                   </label>
//                   <div className="relative">
//                     <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       placeholder="أدخل اسمك الكامل"
//                       className="pr-10 text-right"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     البريد الإلكتروني (اختياري)
//                   </label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="example@email.com"
//                     className="text-right"
//                     disabled={loading}
//                     dir="ltr"
//                   />
//                 </div>
//               </div>

//               {/* العنوان */}
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold text-right border-b pb-2 flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   العنوان
//                 </h3>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     المحافظة *
//                   </label>
//                   <select
//                     value={address.governorate}
//                     onChange={(e) => handleAddressChange('governorate', e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
//                     disabled={loading}
//                   >
//                     <option value="">اختر المحافظة</option>
//                     {governorates.map(gov => (
//                       <option key={gov} value={gov}>{gov}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       المنطقة / القضاء *
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.district}
//                       onChange={(e) => handleAddressChange('district', e.target.value)}
//                       placeholder="المنطقة"
//                       className="text-right"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       الحي / المنطقة *
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.area}
//                       onChange={(e) => handleAddressChange('area', e.target.value)}
//                       placeholder="الحي"
//                       className="text-right"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                     الشارع والتفاصيل *
//                   </label>
//                   <div className="relative">
//                     <Navigation className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
//                     <textarea
//                       value={address.street}
//                       onChange={(e) => handleAddressChange('street', e.target.value)}
//                       placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
//                       className="w-full p-2 border border-gray-300 rounded-lg text-right pr-10 min-h-[80px] resize-none"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       أقرب نقطة دالة
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.landmark}
//                       onChange={(e) => handleAddressChange('landmark', e.target.value)}
//                       placeholder="مقابل، بجانب..."
//                       className="text-right"
//                       disabled={loading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                       الرمز البريدي
//                     </label>
//                     <Input
//                       type="text"
//                       value={address.postalCode}
//                       onChange={(e) => handleAddressChange('postalCode', e.target.value.replace(/\D/g, ''))}
//                       placeholder="الرمز البريدي"
//                       className="text-right"
//                       disabled={loading}
//                       dir="ltr"
//                       maxLength={5}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* أزرار التحكم */}
//               <div className="flex gap-2 pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={handleBack}
//                   disabled={loading}
//                   className="flex-1"
//                 >
//                   رجوع
//                 </Button>
//                 <Button
//                   onClick={handleVerify}
//                   disabled={loading || !code.trim() || !name.trim() || code.length !== 4 || !address.governorate || !address.district || !address.area || !address.street}
//                   className="flex-1"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       جاري إنشاء الحساب...
//                     </>
//                   ) : (
//                     'إنشاء الحساب'
//                   )}
//                 </Button>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSendOTP}
//                   disabled={loading}
//                   className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
//                 >
//                   لم يصلك الرمز؟ إعادة إرسال
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* معلومات إضافية */}
//           <div className="pt-4 border-t">
//             <p className="text-xs text-gray-500 text-center">
//               بالمتابعة، أنت توافق على{' '}
//               <a href="/terms" className="text-blue-600 hover:underline">
//                 الشروط والأحكام
//               </a>
//               {' '}و{' '}
//               <a href="/privacy" className="text-blue-600 hover:underline">
//                 سياسة الخصوصية
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Loader2, Phone, Lock, ArrowRight, Home, User, MapPin, Navigation, CheckCircle } from 'lucide-react';

// interface LoginProps {
//   showCloseButton?: boolean;
//   onClose?: () => void;
// }

// interface AddressForm {
//   governorate: string;
//   district: string;
//   area: string;
//   street: string;
//   landmark: string;
//   postalCode: string;
// }

// interface SendOTPResponse {
//   success: boolean;
//   exists?: boolean;
//   message?: string;
//   debugOtp?: string;
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth();
//   const { transferGuestCartToUser } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [step, setStep] = useState<'phone' | 'verify'>('phone');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [userExists, setUserExists] = useState<boolean>(false);

//   // Address form for new users
//   const [address, setAddress] = useState<AddressForm>({
//     governorate: '',
//     district: '',
//     area: '',
//     street: '',
//     landmark: '',
//     postalCode: ''
//   });

//   const governorates = [
//     'بغداد', 'البصرة', 'نينوى', 'أربيل', 'الأنبار', 'كربلاء', 
//     'بابل', 'صلاح الدين', 'ذي قار', 'واسط', 'ميسان', 'القادسية',
//     'المثنى', 'دهوك', 'السليمانية'
//   ];

//   const handleAddressChange = (field: keyof AddressForm, value: string) => {
//     setAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

// const handleSendOTP = async () => {
//   if (!phone.trim()) {
//     setError('الرجاء إدخال رقم الهاتف');
//     return;
//   }

//   const phoneRegex = /^07[0-9]{9}$/;
//   const cleanPhone = phone.replace(/\s/g, '');
  
//   if (!phoneRegex.test(cleanPhone)) {
//     setError('رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 11 رقماً');
//     return;
//   }

//   setLoading(true);
//   setError(null);
  
//   try {
//     console.log('إرسال رمز التحقق إلى:', cleanPhone);
//     const result = await sendOTP(cleanPhone) as SendOTPResponse;
//     console.log('نتيجة إرسال الرمز:', result);
    
//     if (result.success) {
//       // الـ exists موجود داخل result.data وليس result مباشرة
//       const exists = result.data?.exists ?? false;
      
//       setStep('verify');
//       setUserExists(exists);
      
//       console.log('userExists:', exists);
//       console.log('result.data.exists:', result.data?.exists);
      
//       // عرض رمز التحقق للاختبار
//       if (result.data?.debugOtp) {
//         console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
//         alert(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
//       }
//     } else {
//       setError(result.message || 'فشل في إرسال رمز التحقق');
//     }
//   } catch (err: any) {
//     console.error('خطأ في إرسال الرمز:', err);
//     setError('حدث خطأ أثناء إرسال رمز التحقق');
//   } finally {
//     setLoading(false);
//   }
// }

//   const handleVerify = async () => {
//     if (!code.trim()) {
//       setError('الرجاء إدخال رمز التحقق');
//       return;
//     }

//     // إذا كان المستخدم جديداً، نتحقق من البيانات الإضافية
//     if (!userExists) {
//       if (!name.trim()) {
//         setError('الرجاء إدخال اسمك');
//         return;
//       }

//       if (!address.governorate || !address.district || !address.area || !address.street) {
//         setError('الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، الحي، والشارع)');
//         return;
//       }
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const cleanPhone = phone.replace(/\s/g, '');
//       console.log('التحقق من الرمز:', { 
//         phone: cleanPhone, 
//         code, 
//         userExists,
//         hasName: !!name.trim(),
//         hasAddress: !!address.street
//       });
      
//       // إعداد بيانات المستخدم - فقط إذا كان مستخدم جديد
//       const userData = userExists
//         ? undefined
//         : {
//             name: name.trim(),
//             email: email.trim() || `${cleanPhone}@example.com`,
//             address: {
//               street: address.street,
//               city: address.governorate,
//               district: address.district,
//               area: address.area,
//               landmark: address.landmark,
//               postalCode: address.postalCode || "00000"
//             }
//           };

//       const result = await login(cleanPhone, code, userData);
//       console.log('نتيجة تسجيل الدخول:', result);
      
//       if (result.success) {
//         // نقل سلة الضيف إلى حساب المستخدم
//         await transferGuestCartToUser();
        
//         // إعادة التوجيه إلى الصفحة السابقة أو الصفحة الرئيسية
//         const from = (location.state as any)?.from?.pathname || '/';
        
//         if (onClose) {
//           onClose();
//         } else {
//           navigate(from, { replace: true });
//         }
//       } else {
//         setError(result.error || 'فشل التحقق من الرمز. تأكد من صحة الرمز المدخل');
//       }
//     } catch (err: any) {
//       console.error('خطأ في التحقق:', err);
//       setError('حدث خطأ أثناء التحقق من الرمز');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const handleBack = () => {
//     setStep('phone');
//     setCode('');
//     setName('');
//     setEmail('');
//     setAddress({
//       governorate: '',
//       district: '',
//       area: '',
//       street: '',
//       landmark: '',
//       postalCode: ''
//     });
//     setUserExists(false);
//     setError(null);
//   };

//   const formatPhoneNumber = (value: string) => {
//     const numbers = value.replace(/\D/g, '');
//     let formatted = numbers;
//     if (numbers.startsWith('07') && numbers.length > 2) {
//       formatted = `07${numbers.slice(2, 11)}`; // 10 أرقام
//     }
    
//     // تنسيق: 07X XXX XXXX
//     if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
//     } else if (formatted.length > 5) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{0,4})/, '$1 $2 $3');
//     } else if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{0,3})/, '$1 $2');
//     }
    
//     return formatted;
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     setPhone(formatted);
//   };

//   const isPhoneValid = phone.replace(/\s/g, '').length === 11;

//   useEffect(() => {
//     if (step === 'phone') {
//       setUserExists(false);
//     }
//   }, [step]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
//       <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <CardHeader className="space-y-1 relative sticky top-0 bg-white z-10">
//           {showCloseButton && (
//             <Button 
//               variant="ghost"
//               size="icon"
//               onClick={handleBackToHome}
//               className="absolute left-4 top-4"
//             >
//               <Home className="w-5 h-5" />
//             </Button>
//           )}
          
//           <CardTitle className="text-2xl font-bold text-center">
//             {step === 'phone' ? 'تسجيل الدخول / إنشاء حساب' : 'التحقق من الرمز'}
//           </CardTitle>
//           <CardDescription className="text-center">
//             {step === 'phone' 
//               ? 'أدخل رقم هاتفك للمتابعة' 
//               : userExists 
//                 ? 'أدخل رمز التحقق لتسجيل الدخول' 
//                 : 'أدخل رمز التحقق ومعلوماتك الشخصية'}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-right text-sm">
//               {error}
//             </div>
//           )}

//           {step === 'phone' ? (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رقم الهاتف
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                     placeholder="07X XXX XXXX"
//                     className="pr-10 text-right text-lg"
//                     disabled={loading}
//                     dir="ltr"
//                     maxLength={14}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-right">
//                   {phone ? `${11 - phone.replace(/\s/g, '').length} أرقام متبقية` : 'أدخل 10 أرقام يبدأ بـ 07'}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1 text-right">
//                   مثال: 0799 999 9999
//                 </p>
//               </div>

//               <Button
//                 onClick={handleSendOTP}
//                 disabled={loading || !isPhoneValid}
//                 className="w-full"
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                     جاري الإرسال...
//                   </>
//                 ) : (
//                   <>
//                     متابعة
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>

//               {userExists && (
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2">
//                   <div className="flex items-center gap-3">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <div>
//                       <h4 className="font-medium text-green-800 text-sm">
//                         مرحباً بعودتك!
//                       </h4>
//                       <p className="text-green-700 text-xs mt-1">
//                         تم التعرف على رقم هاتفك. أدخل رمز التحقق لتسجيل الدخول.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* رمز التحقق */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                   رمز التحقق *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
//                     placeholder="أدخل رمز التحقق المكون من 4 أرقام"
//                     className="pr-10 text-center tracking-widest text-lg font-mono"
//                     disabled={loading}
//                     maxLength={4}
//                     dir="ltr"
//                   />
//                 </div>
//               </div>

//               {/* المعلومات الشخصية والعنوان - للمستخدمين الجدد فقط */}
//               {!userExists && (
//                 <>
//                   <div className="space-y-3">
//                     <h3 className="text-lg font-semibold text-right border-b pb-2">
//                       المعلومات الشخصية
//                     </h3>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                         الاسم الكامل *
//                       </label>
//                       <div className="relative">
//                         <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <Input
//                           type="text"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           placeholder="أدخل اسمك الكامل"
//                           className="pr-10 text-right"
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                         البريد الإلكتروني (اختياري)
//                       </label>
//                       <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="example@email.com"
//                         className="text-right"
//                         disabled={loading}
//                         dir="ltr"
//                       />
//                     </div>
//                   </div>

//                   {/* العنوان */}
//                   <div className="space-y-3">
//                     <h3 className="text-lg font-semibold text-right border-b pb-2 flex items-center gap-2">
//                       <MapPin className="w-5 h-5" />
//                       العنوان
//                     </h3>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                         المحافظة *
//                       </label>
//                       <select
//                         value={address.governorate}
//                         onChange={(e) => handleAddressChange('governorate', e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
//                         disabled={loading}
//                       >
//                         <option value="">اختر المحافظة</option>
//                         {governorates.map(gov => (
//                           <option key={gov} value={gov}>{gov}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                           المنطقة / القضاء *
//                         </label>
//                         <Input
//                           type="text"
//                           value={address.district}
//                           onChange={(e) => handleAddressChange('district', e.target.value)}
//                           placeholder="المنطقة"
//                           className="text-right"
//                           disabled={loading}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                           الحي / المنطقة *
//                         </label>
//                         <Input
//                           type="text"
//                           value={address.area}
//                           onChange={(e) => handleAddressChange('area', e.target.value)}
//                           placeholder="الحي"
//                           className="text-right"
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                         الشارع والتفاصيل *
//                       </label>
//                       <div className="relative">
//                         <Navigation className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
//                         <textarea
//                           value={address.street}
//                           onChange={(e) => handleAddressChange('street', e.target.value)}
//                           placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
//                           className="w-full p-2 border border-gray-300 rounded-lg text-right pr-10 min-h-[80px] resize-none"
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                           أقرب نقطة دالة
//                         </label>
//                         <Input
//                           type="text"
//                           value={address.landmark}
//                           onChange={(e) => handleAddressChange('landmark', e.target.value)}
//                           placeholder="مقابل، بجانب..."
//                           className="text-right"
//                           disabled={loading}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
//                           الرمز البريدي
//                         </label>
//                         <Input
//                           type="text"
//                           value={address.postalCode}
//                           onChange={(e) => handleAddressChange('postalCode', e.target.value.replace(/\D/g, ''))}
//                           placeholder="الرمز البريدي"
//                           className="text-right"
//                           disabled={loading}
//                           dir="ltr"
//                           maxLength={5}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div className="flex gap-2 pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={handleBack}
//                   disabled={loading}
//                   className="flex-1"
//                 >
//                   رجوع
//                 </Button>
//                 <Button
//                   onClick={handleVerify}
//                   disabled={
//                     loading || 
//                     !code.trim() || 
//                     code.length !== 4 || 
//                     (!userExists && (!name.trim() || !address.governorate || !address.district || !address.area || !address.street))
//                   }
//                   className="flex-1"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       {userExists ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...'}
//                     </>
//                   ) : (
//                     userExists ? 'تسجيل الدخول' : 'إنشاء الحساب'
//                   )}
//                 </Button>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSendOTP}
//                   disabled={loading}
//                   className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
//                 >
//                   لم يصلك الرمز؟ إعادة إرسال
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="pt-4 border-t">
//             <p className="text-xs text-gray-500 text-center">
//               بالمتابعة، أنت توافق على{' '}
//               <a href="/terms" className="text-blue-600 hover:underline">
//                 الشروط والأحكام
//               </a>
//               {' '}و{' '}
//               <a href="/privacy" className="text-blue-600 hover:underline">
//                 سياسة الخصوصية
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;





import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2, Phone, Lock, ArrowRight, Home, User, MapPin, Navigation, CheckCircle, Shield, Smartphone } from 'lucide-react';

interface LoginProps {
  showCloseButton?: boolean;
  onClose?: () => void;
}

interface AddressForm {
  governorate: string;
  district: string;
  area: string;
  street: string;
  landmark: string;
  postalCode: string;
}

interface SendOTPResponse {
  success: boolean;
  exists?: boolean;
  message?: string;
  debugOtp?: string;
}

const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
  const { login, sendOTP } = useAuth();
  const { transferGuestCartToUser } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [debugOtp, setDebugOtp] = useState<string>('');

  // Address form for new users
  const [address, setAddress] = useState<AddressForm>({
    governorate: '',
    district: '',
    area: '',
    street: '',
    landmark: '',
    postalCode: ''
  });

  const governorates = [
    'بغداد', 'البصرة', 'نينوى', 'أربيل', 'الأنبار', 'كربلاء', 
    'بابل', 'صلاح الدين', 'ذي قار', 'واسط', 'ميسان', 'القادسية',
    'المثنى', 'دهوك', 'السليمانية'
  ];

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      setError('الرجاء إدخال رقم الهاتف');
      return;
    }

    const phoneRegex = /^07[0-9]{9}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      setError('رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 11 رقماً');
      return;
    }

    setLoading(true);
    setError(null);
    setDebugOtp('');
    
    try {
      console.log('إرسال رمز التحقق إلى:', cleanPhone);
      const result = await sendOTP(cleanPhone) as SendOTPResponse;
      console.log('نتيجة إرسال الرمز:', result);
      
      if (result.success) {
        const exists = result.data?.exists ?? false;
        
        setStep('verify');
        setUserExists(exists);
        
        // حفظ رمز التحقق لعرضه على الشاشة
        if (result.data?.debugOtp) {
          setDebugOtp(result.data.debugOtp);
          console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`);
        }
        
        console.log('userExists:', exists);
        console.log('result.data.exists:', result.data?.exists);
      } else {
        setError(result.message || 'فشل في إرسال رمز التحقق');
      }
    } catch (err: any) {
      console.error('خطأ في إرسال الرمز:', err);
      setError('حدث خطأ أثناء إرسال رمز التحقق');
    } finally {
      setLoading(false);
    }
  }

  const handleVerify = async () => {
    if (!code.trim()) {
      setError('الرجاء إدخال رمز التحقق');
      return;
    }

    if (!userExists) {
      if (!name.trim()) {
        setError('الرجاء إدخال اسمك');
        return;
      }

      if (!address.governorate || !address.district || !address.area || !address.street) {
        setError('الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، الحي، والشارع)');
        return;
      }
    }

    setLoading(true);
    setError(null);
    
    try {
      const cleanPhone = phone.replace(/\s/g, '');
      console.log('التحقق من الرمز:', { 
        phone: cleanPhone, 
        code, 
        userExists,
        hasName: !!name.trim(),
        hasAddress: !!address.street
      });
      
      const userData = userExists
        ? undefined
        : {
            name: name.trim(),
            email: email.trim() || `${cleanPhone}@example.com`,
            address: {
              street: address.street,
              city: address.governorate,
              district: address.district,
              area: address.area,
              landmark: address.landmark,
              postalCode: address.postalCode || "00000"
            }
          };

      const result = await login(cleanPhone, code, userData);
      console.log('نتيجة تسجيل الدخول:', result);
      
      if (result.success) {
        await transferGuestCartToUser();
        
        const from = (location.state as any)?.from?.pathname || '/';
        
        if (onClose) {
          onClose();
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(result.error || 'فشل التحقق من الرمز. تأكد من صحة الرمز المدخل');
      }
    } catch (err: any) {
      console.error('خطأ في التحقق:', err);
      setError('حدث خطأ أثناء التحقق من الرمز');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBack = () => {
    setStep('phone');
    setCode('');
    setName('');
    setEmail('');
    setAddress({
      governorate: '',
      district: '',
      area: '',
      street: '',
      landmark: '',
      postalCode: ''
    });
    setUserExists(false);
    setError(null);
    setDebugOtp('');
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = numbers;
    if (numbers.startsWith('07') && numbers.length > 2) {
      formatted = `07${numbers.slice(2, 11)}`;
    }
    
    if (formatted.length > 2) {
      formatted = formatted.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (formatted.length > 5) {
      formatted = formatted.replace(/(\d{2})(\d{3})(\d{0,4})/, '$1 $2 $3');
    } else if (formatted.length > 2) {
      formatted = formatted.replace(/(\d{2})(\d{0,3})/, '$1 $2');
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const isPhoneValid = phone.replace(/\s/g, '').length === 11;

  useEffect(() => {
    if (step === 'phone') {
      setUserExists(false);
      setDebugOtp('');
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-lg shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center pb-6">
          {showCloseButton && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={handleBackToHome}
              className="absolute left-6 top-6 hover:bg-gray-100 rounded-full"
            >
              <Home className="w-5 h-5" />
            </Button>
          )}
          
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold bg-gradient-to-l from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {step === 'phone' ? 'مرحباً بك' : 'التحقق من الهوية'}
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            {step === 'phone' 
              ? 'أدخل رقم هاتفك للمتابعة' 
              : userExists 
                ? 'أدخل رمز التحقق المرسل إلى هاتفك' 
                : 'أكمل معلوماتك الشخصية'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-right text-sm flex items-start gap-2">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-xs">!</span>
              </div>
              <span>{error}</span>
            </div>
          )}

          {step === 'phone' ? (
            <div className="space-y-6">
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="07X XXX XXXX"
                    className="pr-12 text-right text-lg h-14 border-2 border-gray-200 focus:border-blue-500 bg-white rounded-xl"
                    disabled={loading}
                    dir="ltr"
                    maxLength={14}
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-500">
                    {phone ? `${11 - phone.replace(/\s/g, '').length} أرقام متبقية` : 'أدخل 11 رقماً'}
                  </p>
                  <p className="text-xs text-gray-500">
                    مثال: 0799 999 9999
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={loading || !isPhoneValid}
                className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/25 transition-all duration-200"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    متابعة
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  سنرسل رمز تحقق إلى هاتفك
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* رمز التحقق مع عرض للاختبار */}
              {debugOtp && (
                <div className="bg-gradient-to-l from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800 text-sm">
                      رمز التحقق للاختبار
                    </h4>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 font-mono tracking-widest bg-green-100 py-3 rounded-lg">
                      {debugOtp}
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      هذا الرمز معروض للاختبار فقط
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  رمز التحقق *
                </label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="أدخل رمز التحقق المكون من 4 أرقام"
                    className="pr-12 text-center tracking-widest text-xl font-mono h-14 border-2 border-gray-200 focus:border-blue-500 bg-white rounded-xl"
                    disabled={loading}
                    maxLength={4}
                    dir="ltr"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  أدخل الرمز المكون من 4 أرقام المرسل إلى {phone}
                </p>
              </div>

              {/* المعلومات الشخصية والعنوان - للمستخدمين الجدد فقط */}
              {!userExists && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-right border-b pb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      المعلومات الشخصية
                    </h3>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                          الاسم الكامل *
                        </label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="أدخل اسمك الكامل"
                            className="pr-10 text-right h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                          البريد الإلكتروني (اختياري)
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@email.com"
                          className="text-right h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                          disabled={loading}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* العنوان */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-right border-b pb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      العنوان
                    </h3>

                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                          المحافظة *
                        </label>
                        <select
                          value={address.governorate}
                          onChange={(e) => handleAddressChange('governorate', e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl text-right bg-white focus:border-blue-500 focus:ring-0 h-12"
                          disabled={loading}
                        >
                          <option value="">اختر المحافظة</option>
                          {governorates.map(gov => (
                            <option key={gov} value={gov}>{gov}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            المنطقة / القضاء *
                          </label>
                          <Input
                            type="text"
                            value={address.district}
                            onChange={(e) => handleAddressChange('district', e.target.value)}
                            placeholder="المنطقة"
                            className="text-right h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            disabled={loading}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            الحي / المنطقة *
                          </label>
                          <Input
                            type="text"
                            value={address.area}
                            onChange={(e) => handleAddressChange('area', e.target.value)}
                            placeholder="الحي"
                            className="text-right h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                          الشارع والتفاصيل *
                        </label>
                        <div className="relative">
                          <Navigation className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            value={address.street}
                            onChange={(e) => handleAddressChange('street', e.target.value)}
                            placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
                            className="w-full p-3 border-2 border-gray-200 rounded-xl text-right pr-10 min-h-[80px] resize-none focus:border-blue-500 focus:ring-0"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            أقرب نقطة دالة
                          </label>
                          <Input
                            type="text"
                            value={address.landmark}
                            onChange={(e) => handleAddressChange('landmark', e.target.value)}
                            placeholder="مقابل، بجانب..."
                            className="text-right h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            disabled={loading}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            الرمز البريدي
                          </label>
                          <Input
                            type="text"
                            value={address.postalCode}
                            onChange={(e) => handleAddressChange('postalCode', e.target.value.replace(/\D/g, ''))}
                            placeholder="الرمز البريدي"
                            className="text-right h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            disabled={loading}
                            dir="ltr"
                            maxLength={5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400"
                >
                  رجوع
                </Button>
                <Button
                  onClick={handleVerify}
                  disabled={
                    loading || 
                    !code.trim() || 
                    code.length !== 4 || 
                    (!userExists && (!name.trim() || !address.governorate || !address.district || !address.area || !address.street))
                  }
                  className="flex-1 h-12 text-base font-semibold rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/25"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      {userExists ? 'جاري تسجيل الدخول...' : 'جاري إنشاء الحساب...'}
                    </>
                  ) : (
                    userExists ? 'تسجيل الدخول' : 'إنشاء الحساب'
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 font-medium"
                >
                  لم يصلك الرمز؟ إعادة إرسال
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              بالمتابعة، أنت توافق على{' '}
              <a href="/terms" className="text-blue-600 hover:underline font-medium">
                الشروط والأحكام
              </a>
              {' '}و{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;