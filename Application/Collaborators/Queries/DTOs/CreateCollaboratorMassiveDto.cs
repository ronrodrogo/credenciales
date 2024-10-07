using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EAS.Application.Collaborators.Queries.DTOs
{
    public class RowWithError
    {
        public int RowNumber { get; set; }
        public List<string> Messsages { get; set; }
    }

    public class RowSuccess : CreateCollaboratorMassiveDto
    {
        public int RowNumber { get; set; }
    }
    public class CreateCollaboratorMassiveDto
    {
        public List<RowWithError> Errors { get; set; }
        public List<RowSuccess> Success { get; set; }
    }
}
