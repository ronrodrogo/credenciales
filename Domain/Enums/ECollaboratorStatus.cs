using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum ECollaboratorStatus
    {
        Fijo = 1,
        Temporal = 2,
    }
}