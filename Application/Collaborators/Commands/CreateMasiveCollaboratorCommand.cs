using Application.Common.Interfaces;
using Domain.Entities;
using EAS.Application.Collaborators.Queries.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Collaborators.Commands;

public record CreateMasiveCollaboratorCommand : IRequest<Response<CreateCollaboratorMassiveDto>>
{
    public IFormFile FileData { get; init; }
}

public class CreateMasiveCollaboratorCommandHandler
    (
        IRepository<Collaborator> _repository,
        IMediator _mediator
    )
    : IRequestHandler<CreateMasiveCollaboratorCommand, Response<CreateCollaboratorMassiveDto>>
{
    public async Task<Response<CreateCollaboratorMassiveDto>> Handle(CreateMasiveCollaboratorCommand command, CancellationToken cancellationToken)
    {
        Response<CreateCollaboratorMassiveDto> result = new();
        try
		{
            if (command.FileData != null)
            {
                var stream = command.FileData.OpenReadStream();
                List<RowWithError> errors = new List<RowWithError>();
                List<RowSuccess> success = new List<RowSuccess>();
                //using (XLWorkbook excelWorkbook = new XLWorkbook(stream))
                //{
                //    IXLRows rows = excelWorkbook.Worksheet(1).RowsUsed();
                //    int startIndex = rows.Count();
                //    for (int i = 3; i <= rows.Count(); i++)
                //    {
                //        var cells = excelWorkbook.Worksheet(1).Row(i).Cells("1:29").ToList();

                //        var accounts = await this._mediator.Send(new GetAccountDodaacByRolQuery { });
                //        var account = accounts.Result.Where(res => res.AccountNbr.Equals(cells[0].Value.ToString())).FirstOrDefault();

                //        if (account == null)
                //        {
                //            errors.Add(new RowWithError()
                //            {
                //                RowNumber = i,
                //                Messsages = [$"the account {cells[0].Value.ToString()} does not exist"]
                //            });
                //            continue;
                //        }

                //        var method = (EShippingMethod)Int32.Parse(cells[12].Value.ToString());
                //        var cardType = (ECardType)Int32.Parse(cells[13].Value.ToString());

                //        var equipments = await this._mediator.Send(new GetFreeEquipmentByCardTypeQuery { CardType = ECardType.FuelOnly, AccountId = account.Id });
                //        var equipment = equipments.Result.Where(equipment => equipment.EquipmentNbr == cells[14].Value.ToString()).FirstOrDefault();

                //        if (equipment == null && cardType != ECardType.AnyTail)
                //        {
                //            errors.Add(new RowWithError()
                //            {
                //                RowNumber = i,
                //                Messsages = [$"equipment {cells[14].Value.ToString()} does not exist for the account {cells[0].Value.ToString()}"]
                //            });
                //            continue;
                //        }

                //        var sameBillingAddress = !(cells[1].Value.ToString() == "" || cells[1].Value.ToString() == "NO");

                //        var accountTotal = await this._mediator.Send(new GetAccountByIdQuery { Id = account.Id });

                //        var ShippingTitle = sameBillingAddress ? (ETitle)accountTotal.Result.Title : (cells[2].Value.ToString() != "" ? (ETitle)Int32.Parse(cells[2].Value.ToString()) : ETitle.Mr);
                //        var ShippingFirstName = sameBillingAddress ? accountTotal.Result.FirstName : cells[3].Value.ToString();
                //        var ShippingLastName = sameBillingAddress ? accountTotal.Result.LastName : cells[4].Value.ToString();
                //        var ShippingAddress = sameBillingAddress ? accountTotal.Result.Address : cells[5].Value.ToString();
                //        var ShippingAddress2 = sameBillingAddress ? accountTotal.Result.Address2 : cells[6].Value.ToString();
                //        var ShippingApartment = sameBillingAddress ? accountTotal.Result.Apartment : cells[7].Value.ToString();
                //        var ShippingCountry = sameBillingAddress ? accountTotal.Result.Country : cells[8].Value.ToString();
                //        var ShippingState = sameBillingAddress ? accountTotal.Result.State : cells[9].Value.ToString();
                //        var ShippingCity = sameBillingAddress ? accountTotal.Result.City : cells[10].Value.ToString();
                //        var ShippingZip = sameBillingAddress ? accountTotal.Result.Zip : cells[11].Value.ToString();

                //        var doddac = account.Dodaacs.Where(doddac => doddac.DodaacNbr == cells[20].Value.ToString()).FirstOrDefault();


                //        CreateCardRequestCommandLoa card = new()
                //        {
                //            CardType = cardType,
                //            EquipmentId = equipment?.Id ?? null,
                //            FundCode = cells[15].Value.ToString(),
                //            SignalCode = cells[16].Value.ToString(),
                //            SubAccountCode = cells[19].Value.ToString(),
                //            CardDodaac = doddac != null ? doddac.Id : 0,
                //            FuelCapacity = cells[21].Value.ToString() != "" ? Int32.Parse(cells[21].Value.ToString()) : null,
                //            EffectiveDate = cells[22].Value.ToString() != "" ? DateTime.Parse(cells[22].Value.ToString()) : null,
                //            SupplementalDodaac = cells[23].Value.ToString(),
                //            TecOrgApcJono = cells[24].Value.ToString(),
                //        };

                //        CreateCardRequestCommand cardRequest = new()
                //        {
                //            AccountId = account.Id,
                //            SameBillingAddress = sameBillingAddress,
                //            ShippingTitle = ShippingTitle,
                //            ShippingFirstName = ShippingFirstName,
                //            ShippingLastName = ShippingLastName,
                //            ShippingAddress = ShippingAddress,
                //            ShippingAddress2 = ShippingAddress2,
                //            ShippingApartment = ShippingApartment,
                //            ShippingCountry = ShippingCountry,
                //            ShippingState = ShippingState,
                //            ShippingCity = ShippingCity,
                //            ShippingZip = ShippingZip,
                //            ShippingMethod = method,
                //            Cards = [card],
                //            VirtualPhone = cells[26].Value.ToString(),
                //            VirtualEmail = cells[27].Value.ToString(),
                //            CreatedComments = cells[28].Value.ToString(),
                //            RequestType = ECardRequestType.New,
                //        };

                //        try
                //        {
                //            var cards = await this._mediator.Send(cardRequest);
                //            RowSuccess cardSave = new RowSuccess()
                //            {
                //                RowNumber = i,
                //                AutoApprove = cards.Result.AutoApprove,
                //                CardNumber = cards.Result.CardNumber,
                //                RequestDate = cards.Result.RequestDate,
                //                RequestIds = cards.Result.RequestIds,
                //            };
                //            success.Add(cardSave);
                //        }
                //        catch (ValidationException ex)
                //        {
                //            RowWithError cardError = new RowWithError()
                //            {
                //                RowNumber = i,
                //                Messsages = []
                //            };
                //            foreach (var error in ex.Errors)
                //            {
                //                cardError.Messsages.Add(string.Join("", error.Value.ToArray()));
                //            }
                //            errors.Add(cardError);
                //        }

                //    }
                //}
                result.Result = new()
                {
                    Success = success,
                    Errors = errors,
                };
                return result;
            }
            return result;


        }
        catch (Exception ex)
		{
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
		return result;
    }

  
}

