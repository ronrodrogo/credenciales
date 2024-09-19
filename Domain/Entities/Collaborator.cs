
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Collaborator : BaseEntity
    {
        public string RUT { get; set; }
        public string CompleteName { get; set; }
        //public int AreaId { get; set; }
        public string Area { get; set; }
        public int LeadershipId { get; set; }
        public string Position { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public ECollaboratorStatus ECollaboratorStatus { get; set; }
    
        //public Area Area { get; set; }
        public Leadership Leadership { get; set; }
        public List<Attachment> Attachments { get; set; }
    }
    
}