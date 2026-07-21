
using Business.Handlers.Stocks.Commands;
using FluentValidation;

namespace Business.Handlers.Stocks.ValidationRules
{

    public class CreateStockValidator : AbstractValidator<CreateStockCommand>
    {
        public CreateStockValidator()
        {
            RuleFor(x => x.CreatedUserId).NotEmpty();
            RuleFor(x => x.CreatedDate).NotEmpty();
            RuleFor(x => x.LastUpdatedUserId).NotEmpty();
            RuleFor(x => x.LastUpdatedDate).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();

        }
    }
    public class UpdateStockValidator : AbstractValidator<UpdateStockCommand>
    {
        public UpdateStockValidator()
        {
            RuleFor(x => x.CreatedUserId).NotEmpty();
            RuleFor(x => x.CreatedDate).NotEmpty();
            RuleFor(x => x.LastUpdatedUserId).NotEmpty();
            RuleFor(x => x.LastUpdatedDate).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.Quantity).NotEmpty();

        }
    }
}