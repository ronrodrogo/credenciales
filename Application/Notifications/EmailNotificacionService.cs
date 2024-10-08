using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Notifications.Helpers;

namespace Application.Notifications
{
    public interface IEmailNotificationService
    {
        public void SendEmail(EmailNotification notification);
    }

    public class EmailNotificationService(IConfiguration _configuration) : IEmailNotificationService
    {
        public void SendEmail(EmailNotification notification)
        {
            var fromEmail = _configuration["EmailConfiguration:FromEmail"];
            var fromPassword = _configuration["EmailConfiguration:Password"];
            var smtpHost = _configuration["EmailConfiguration:SmtpHost"];
            var smtpPort = Convert.ToInt32(_configuration["EmailConfiguration:Port"]);

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = notification.Subject,
                Body = Templates.FillTemplate(notification.TemplateName ?? "GeneralTemplate.html", notification.Body).Result,
                IsBodyHtml = true
            };

            mailMessage.To.Add(notification.ToEmail);

            using var smtpClient = new SmtpClient(smtpHost, smtpPort);

            smtpClient.Credentials = new NetworkCredential(fromEmail, fromPassword);
            smtpClient.EnableSsl = true;

            try
            {
                smtpClient.Send(mailMessage);
                Console.WriteLine("Correo enviado exitosamente.");
            }
            catch (SmtpException ex)
            {
                Console.WriteLine($"Error SMTP: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al enviar el correo: {ex.Message}");
            }
        }


    }

    public class EmailNotification
    {
        public string ToEmail { get; set; }
        public Dictionary<string, string> Body { get; set; }
        public string Subject { get; set; }
        public string TemplateName { get; set; }

    }

}