using System;
using System.ComponentModel;

namespace Domain.Enums
{
    [Flags]
    public enum EAttachmentType
    {
        Photo = 1,
        Signature = 2,
        Credential = 3,
    }
}