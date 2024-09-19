using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum ECollaboratorStatus
    {
        [Description("Fijo")]
        Fijo = 1,
        [Description("Temporal")]
        Temporal = 2,
    }
}